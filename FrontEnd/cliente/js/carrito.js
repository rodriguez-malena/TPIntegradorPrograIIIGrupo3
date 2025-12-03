import { initTema, imprimirDatosAlumno } from "./tema.js";
import { verificarLogin } from "./verificar.js";
imprimirDatosAlumno();
initTema();
verificarLogin();


// Obtener el nombre del cliente
const usuario = localStorage.getItem("nombreCliente");

// Crear la clave única para este usuario
const keyCarrito = "carrito_" + usuario;

// Cargar carrito del usuario
let carrito = JSON.parse(localStorage.getItem(keyCarrito)) || [];

let elementosCarrito = document.getElementById("elementosCarrito");
let totalCarrito = document.getElementById("totalCarrito");
let botonCarrito = document.getElementById("botonCarrito");
let contadorCarrito = document.getElementById("contadorCarrito");
let carritoPersonalizado = document.getElementById("carritoPersonalizado");


function mostrarCarrito(){
    carritoPersonalizado.textContent = `Carrito de compras de ${usuario}`;
    
    let total = 0;
    let contenedorCarrito = "";
    
    carrito.forEach((producto, indice) => {
        total += producto.cantidad * producto.precio;

        contenedorCarrito +=  `
        <li class="bloque-item">
            <img src="${producto.ruta_img}" alt="${producto.titulo}">
                <p class="nombre-item">${producto.titulo} - $${producto.precio.toLocaleString()}</p>
                <p>x ${producto.cantidad}</p>
            
            <button onclick="restarProducto(${indice})" class="boton-restar">
            <img src="./img-cliente/restar.png" alt="-">
            </button>
            
            <button onclick="sumarProducto(${indice})" class="boton-sumar">
                <img src="./img-cliente/sumar.png" alt="+">
                </button>

            <button onclick="eliminarProducto(${indice})" class="boton-eliminar">
                <img src="./img-cliente/tacho-basura.png" alt="X">
            </button>
            </li>`;
    });

    elementosCarrito.innerHTML = contenedorCarrito;
    totalCarrito.innerHTML = `<p>Total: $${total.toLocaleString()}</p>`;

    let accionVaciar = "";
    
    if (carrito.length > 0) { 
        accionVaciar = 
        `<button id="btnVaciar" class="btn-vaciar">Vaciar carrito</button>
        <button id="btnImprimir" class="btn-imprimir">Imprimir ticket</button>`;
    }

    botonCarrito.innerHTML = accionVaciar;

    // Guardar carrito del usuario correspondiente
    localStorage.setItem(keyCarrito, JSON.stringify(carrito));

    const btnImprimir = document.getElementById("btnImprimir");
    if (btnImprimir) {
        btnImprimir.addEventListener("click", function(){
        modal.style.display = "block";
        body.style.overflow = "hidden";
        })

        const btnVaciar = document.getElementById("btnVaciar");
        if (btnVaciar) {
            btnVaciar.addEventListener("click", vaciarCarrito);
        }
    }
}


function restarProducto(indice) {
    if (carrito[indice].cantidad > 1) {
        carrito[indice].cantidad--;
    } else {
        carrito.splice(indice, 1);
    }
    mostrarCarrito();
    actualizarContador();
}

function sumarProducto(indice) {
    carrito[indice].cantidad++;
    mostrarCarrito();
    actualizarContador();
}

function eliminarProducto(indice) {
    carrito.splice(indice, 1);
    mostrarCarrito();
    actualizarContador();
}

function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
    actualizarContador();
}

function actualizarContador() {
    let cantidadEnCarrito = carrito.reduce((acumulador, item) => acumulador + item.cantidad, 0);
    contadorCarrito.innerHTML = `Cantidad: ${cantidadEnCarrito} productos`;
}


function imprimirTicket(){
    console.table(carrito)

    // necesitamos para registrar las ventas guardar ids
    const idProductos = []; 

    // gracias al CDN extraemos de la clase jspdf del objeto global window
    const doc = new window.jspdf.jsPDF();


    // creamos una nueva instanacia del doc PDF usando la clase jsPDF
    //const doc = new jsPDF();

    // variable para controlar el eje verticalcocon un margen superior de 10px
    let y = 10

    // establecemos tamaño de 16px para el primer texto
    doc.setFontSize(16);

    // escribimos el texto
    doc.text("Ticket de compra de "+usuario+":",10 ,y);

    
    // incremento 10px
    y += 10
    
    doc.setFontSize(12)
    
    carrito.forEach(producto => {

        idProductos.push(producto.id); // llenamos el array con los ids

        const subtotal = producto.precio * producto.cantidad;

        doc.text(`${producto.titulo}  x${producto.cantidad}  = $${subtotal.toLocaleString()}`, 10,  y);

        // incrementamos 7px la posicion vertical para evitar solapamiento
        y += 7;
    });

    //calculamos el total del ticket usando reduce
    const total = carrito.reduce((acc, producto) => {
        return acc + producto.precio * producto.cantidad;
    }, 0);
    
    // añadimos 5px en el eje vertical para separar productos del total
    y +=5;

    // escribimos el total del ticket en el pdf
    doc.text(`Total: $${total}`, 10, y)

    //Imprimimos ticket
    doc.save("ticket.pdf");

    // to do: llamada para registrar ventas: fetch con metodo post a /api/sales y luego un endpoint  app.post("/api/sales")
    registrarVenta(total, idProductos);

}    

async function registrarVenta(total, idProductos) {
    const fecha = new Date();

    // MYSQL no acepta fechas en formato ISO con milisegundos
    const fechaFormato = fecha.toISOString().slice(0, 19).replace("T", " "); // limpiamos datos para que mysql lo acepte

    const data = {
        date: fechaFormato,
        total_precio: total,
        user_name: usuario,
        products: idProductos
    }

    // TO DO hacer endpoint /api/sales
    /* let response = await fetch("http://localhost:3000", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
        console.log(response);
        alert(result.message)
}
      */  
        alert("¡Ticket impreso!")
        //limpieza y redireccion
        localStorage.removeItem(keyCarrito);
        localStorage.removeItem("nombreCliente");
        localStorage.removeItem("carrito");
        window.location.href = "inicioCliente.html";
        //window.location.href = "encuesta.html";
    //}


}

mostrarCarrito();

    /*===============
MODAL
==================*/
var modal = document.getElementById("ButtonModal");
var body = document.getElementsByTagName("body")[0];

var btnConfirmar = document.getElementById("btnConfirmarImpresion");
var btnCancelar = document.getElementById("btnCancelarModal");

btnCancelar.onclick = function() {
    cerrarModal();
}

btnConfirmar.onclick = function() {
    cerrarModal();
    imprimirTicket();
}

function cerrarModal() {
    modal.style.display = "none";
    body.style.overflow = "visible";
}
/*====*/

window.restarProducto = restarProducto;
window.sumarProducto = sumarProducto;
window.eliminarProducto = eliminarProducto;
