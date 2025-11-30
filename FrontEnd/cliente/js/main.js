export const alumnos = [
    {dni:"46642416", nombre:"Malena", apellido:"Rodriguez Barrio"},
    {dni:"45071872", nombre:"Aisha", apellido:"Pereyra Sole"}
];

let libros = [];

export let listadoProductos = document.getElementById("listadoProductos");
export let contenedorProducto = "";
export let filtroActual = null;

//
let contenedorProductos = document.getElementById("contenedor-productos");
let botonesOrdenar = document.getElementById("botonesSeccionProductos");
// 
let barraBusqueda = document.getElementById("barraBusqueda");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


export let url = "http://localhost:3000";

function estaEnCarrito(id) {
    return carrito.some(item => item.id === id);
}


export async function obtenerProductos() {
    try {
        let respuesta = await fetch(`${url}/api/products`);
        console.log(`Solicitud fetch GET a ${url}/api/products`);
        
        let data = await respuesta.json();
        console.log(data);
        
        libros = data.payload;
        console.log(libros);
        
        mostrarProductos(filtroActual || libros);
    } 
    catch (error) {
        console.error("error: ", error);
    }
}

export function mostrarProductos(array){
    filtroActual = array;
    contenedorProducto = "";
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
    mostrarProductos(filtroActual || libros);
    //actualizarContador();
    //mostrarCarrito();
}

export function eliminarDelCarrito(id){
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
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
    
    if (document.getElementById("listadoProductos")) {
        obtenerProductos();
        filtrarProductos();
    }

    if (document.getElementById("barraBusqueda")) {
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

//Cambiar tema
let body = document.body;
let cambiarTema = document.getElementById('cambiarTema');
body.classList.toggle('tema2', localStorage.getItem('modo')==='t2')
cambiarTema.addEventListener('click', () => {
    let tema = body.classList.toggle('tema2');
    localStorage.setItem('modo', tema ? 't2' : 't1')
})
//