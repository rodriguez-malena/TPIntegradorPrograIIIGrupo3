import { initTema } from "./tema.js";
import { verificarLogin } from "./verificar.js";

export const alumnos = [
    {dni:"46642416", nombre:"Malena", apellido:"Rodriguez Barrio"},
    {dni:"45071872", nombre:"Aisha", apellido:"Pereyra Sole"}
];


let listadoProductos = document.getElementById("listadoProductos");
let contenedorProducto = "";
export let filtroActual = null;


let contenedorProductos = document.getElementById("contenedor-productos");
let botonesOrdenar = document.getElementById("botonesSeccionProductos");

let libros = [];

// Productos actualmente visibles en esta página
let productosActuales = [];

const usuario = verificarLogin();

const keyCarrito = 'carrito_' + usuario;

let carrito = JSON.parse(localStorage.getItem(keyCarrito)) || [];

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

function estaEnCarrito(id) {
    return carrito.some(item => item.id === id);
}

export function mostrarProductos(array){
    filtroActual = array; // guardo estado actual
    contenedorProducto = ""; //limpio
    array.forEach(libro => {
        if (libro.activo ===1){
            
            let botonEliminar ="";
            if (estaEnCarrito(libro.id)){
                botonEliminar = `
                <button onclick="eliminarProductoCarrito(${libro.id})" 
                class="btn-eliminar-carrito">Eliminar del carrito</button>`;
            }

            contenedorProducto += `
            <div class="card-producto">
            <img src="${libro.ruta_img}" alt="${libro.titulo}">
            <h3>${libro.titulo}</h3>
            <p class="p-precio">$${libro.precio.toLocaleString()}</p>
            
            <a href="sinopsis.html?id=${libro.id}">
                        <button>Ver detalle</button>
                    </a>

                    <button onclick= "agregarAlCarrito(${libro.id})">Agregar al carrito</button>
                    
                    ${botonEliminar}
                    </div>`
                }
    });
    listadoProductos.innerHTML = contenedorProducto;
}



//Para que otras páginas sepan qué productos manejar
export function setProductosActuales(lista) {
    productosActuales = lista;
}

export function filtrarProductos(){
let barraBusqueda = document.getElementById("barraBusqueda");

    barraBusqueda.addEventListener("keyup", function(){
        let itemBuscado = barraBusqueda.value.toLowerCase().trim();
        let itemsFiltrados = productosActuales.filter(item => item.titulo.toLowerCase().includes(itemBuscado));
        
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
    localStorage.setItem(keyCarrito, JSON.stringify(carrito));
    
    mostrarProductos(filtroActual || libros);

}

export function eliminarDelCarrito(id){
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem(keyCarrito, JSON.stringify(carrito));
    mostrarProductos(filtroActual || libros); 
}

window.agregarAlCarrito = agregarAlCarrito;
window.eliminarProductoCarrito = eliminarDelCarrito;

export function imprimirDatosAlumno(){
    let datosAlumno = document.getElementById("datosAlumno");
    alumnos.forEach(alumno => {
        console.log(`Alumno: ${alumno.nombre}, Apellido: ${alumno.apellido}, DNI: ${alumno.dni}`);
        datosAlumno.innerHTML += `${alumno.nombre} ${alumno.apellido} </br>`;
    })
    
}

function init() {
    imprimirDatosAlumno();
    initTema();
    
    if (document.getElementById("listadoProductos")) {
        obtenerProductos();
        filtrarProductos();
    }

    if (document.getElementById("barraBusqueda")) {
        filtrarProductos();
    }
    
}

init();

