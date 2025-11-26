export const alumnos = [
    {dni:"46642416", nombre:"Malena", apellido:"Rodriguez Barrio"},
    {dni:"45071872", nombre:"Aisha", apellido:"Pereyra Sole"}
];

let libros = [];


export let listadoProductos = document.getElementById("listadoProductos");
export let contenedorProducto = "";

let barraBusqueda = document.getElementById("barraBusqueda");
let elementosCarrito = document.getElementById("elementosCarrito");

let totalCarrito = document.getElementById("totalCarrito");
let botonCarrito = document.getElementById("botonCarrito");
let botonPagar = document.getElementById("botonPagar");

let contadorCarrito = document.getElementById("contadorCarrito");

let botonesOrdenar = document.getElementById("botonesSeccionProductos");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


let contenedorProductos = document.getElementById("contenedor-productos");

export let url = "http://localhost:3000";

export async function obtenerProductos() {
    try {
        let respuesta = await fetch(`${url}/api/products`);
        console.log(`Solicitud fetch GET a ${url}/api/products`);
        
        let data = await respuesta.json();
        console.log(data);

        libros = data.payload;
        console.log(libros);

        mostrarProductos(libros);
    } 
    catch (error) {
        console.error("error: ", error);
    }
}

export function mostrarProductos(array){
    contenedorProducto = "";
    array.forEach(libro => {
        contenedorProducto += `
            <div class="card-producto">
                <img src="${libro.ruta_img}" alt="${libro.titulo}">
                <h3>${libro.titulo}</h3>
                <p class="p-precio">$${libro.precio.toLocaleString()}</p>

                <a href="sinopsis.html?id=${libro.id}">
                    <button>Ver detalle</button>
                </a>

                <button onclick= "agregarAlCarrito(${libro.id})">Agregar al carrito</button>
            </div>
        `
    });

    listadoProductos.innerHTML = contenedorProducto;
}

//                <span class="sinopsis-ver">${libro.sinopsis}</span> 




function init() {
    imprimirDatosAlumno();

    if (document.getElementById("listadoProductos")) {
        obtenerProductos();
        filtrarProductos();
    }

    if (document.getElementById("elementosCarrito")) {
        mostrarCarrito();
        actualizarContador();
    }
}

init();

/*imprimirDatosAlumno();
obtenerProductos();
filtrarProductos();*/

export function imprimirDatosAlumno(){
    let datosAlumno = document.getElementById("datosAlumno");
    alumnos.forEach(alumno => {
        console.log(`Alumno: ${alumno.nombre}, Apellido: ${alumno.apellido}, DNI: ${alumno.dni}`);
        datosAlumno.innerHTML += `${alumno.nombre} ${alumno.apellido} </br>`;
    })

}


function filtrarProductos(){
    barraBusqueda.addEventListener("keyup", function(){
        let itemBuscado = barraBusqueda.value.toLowerCase().trim();
        
        let itemsFiltrados = libros.filter(item => item.titulo.toLowerCase().includes(itemBuscado));

        mostrarProductos(itemsFiltrados);
    })
}

export function agregarAlCarrito(id){
    let libroExistente = carrito.find(libroCarrito => libroCarrito.id == id);
    let libroBuscado = libros.find(libro => libro.id == id);

    
    if (libroExistente){
        libroExistente.cantidad++;
    } 
    else {
        carrito.push(
            {id: libroBuscado.id, titulo: libroBuscado.titulo, autor:libroBuscado.autor, precio: libroBuscado.precio, ruta_img: libroBuscado.ruta_img, cantidad:1}
        );
    }
    
    alert(`Agregaste "${libroBuscado.titulo}" al carrito`);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
    mostrarCarrito();
    }
    

function mostrarCarrito(){
    carritoPersonalizado.textContent = `Carrito de compras de ${localStorage.getItem('nombreCliente')}`;
    let total = 0;
        let contenedorCarrito = "";
        
        carrito.forEach((producto, indice) => {
            total +=  producto.cantidad * producto.precio;
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
                </li>
                
                `;
    });
    elementosCarrito.innerHTML = contenedorCarrito;
    console.log(carrito);
    
    totalCarrito.innerHTML =  `<p>Total: $${total.toLocaleString()}</p>`;
    
    let accionVaciar = "";
    
    if (carrito.length > 0){ 
            accionVaciar =  
                `<button id="btnVaciar" class="btn-vaciar" onclick="vaciarCarrito()"> Vaciar carrito</button>
                <button id="btnPagar" class="btn-pagar" onclick="">Pagar</button>`;
            }
            
        botonCarrito.innerHTML = accionVaciar;
        
        
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    
    
    
    
    /*Esta funcion primero chequea si  el producto tiene más de 1 repeticion, si esto se cumple, disminuye la cantidad (cantidad--).
Y si solo queda 1 lo elimina completamente del array llamando al método splice el cual elimina 1 elemento en la posicion indicada por "indice" */

function restarProducto(indice){
    if (carrito[indice].cantidad > 1){
        carrito[indice].cantidad--;
        
    }
    else {
        carrito.splice(indice,1);
    }
    mostrarCarrito();
    actualizarContador();
}

function sumarProducto(indice){
    carrito[indice].cantidad++;
    mostrarCarrito();
    actualizarContador();
}

function eliminarProducto(indice){
        carrito.splice(indice,1);    
    mostrarCarrito();
    actualizarContador();
}

function vaciarCarrito(){
    carrito = [];
    mostrarCarrito();
    actualizarContador();
}

function actualizarContador(){
    let cantidadEnCarrito = 0;
    for (let i = 0; i < carrito.length; i++) {
        cantidadEnCarrito += carrito[i].cantidad;
    }
    contadorCarrito.innerHTML = `Cantidad: ${cantidadEnCarrito} productos`;
}

window.agregarAlCarrito = agregarAlCarrito;
window.restarProducto = restarProducto;
window.sumarProducto = sumarProducto;
window.eliminarProducto = eliminarProducto;
window.vaciarCarrito = vaciarCarrito;
