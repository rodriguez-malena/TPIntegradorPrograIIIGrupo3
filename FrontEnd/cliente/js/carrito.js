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
        })}

        const btnVaciar = document.getElementById("btnVaciar");
        if (btnVaciar) {
            btnVaciar.addEventListener("click", vaciarCarrito);
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

    const idProductos = []; // para registrar las ventas
    const doc = new window.jspdf.jsPDF();// gracias al CDN extraemos de la clase jspdf del objeto global window
    
    let y = 10 // variable para controlar el eje vertical con un margen superior de 10px

    doc.setFontSize(16);
    doc.text("Ticket de compra de "+usuario+":",10 ,y);

    y += 10 // incremento 10px
    doc.setFontSize(12)
    
    carrito.forEach(producto => {

        idProductos.push(producto.id); // llenamos el array con los ids

        const subtotal = producto.precio * producto.cantidad;

        doc.text(`${producto.titulo}  x${producto.cantidad}  = $${subtotal.toLocaleString()}`, 10,  y);
        y += 7;
    });

    //calculamos el total del ticket
    const total = carrito.reduce((acc, producto) => {
        return acc + producto.precio * producto.cantidad;
    }, 0);
    
    y +=5;

    doc.text(`Total= $${total.toLocaleString()}`, 10, y)
    doc.save("ticket.pdf");

    registrarVenta(total, idProductos);

}    

async function registrarVenta(total, idProductos) {
    const fecha = new Date();

    const fechaFormato = fecha.toISOString().slice(0, 19).replace("T", " "); // limpiamos datos para que mysql lo acepte

    const data = {
        date: fechaFormato,
        total_precio: total,
        user_name: usuario,
        products: idProductos
    }

        alert("¡Ticket impreso!")
        //limpieza y redireccion
        localStorage.removeItem(keyCarrito);
        localStorage.removeItem("nombreCliente");
        localStorage.removeItem("carrito");
        window.location.href = "inicioCliente.html";
        


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


window.restarProducto = restarProducto;
window.sumarProducto = sumarProducto;
window.eliminarProducto = eliminarProducto;
