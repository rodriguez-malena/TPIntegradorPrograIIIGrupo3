
/*import {imprimirDatosAlumno, obtenerLibros, mostrarProductos, libros } from "./script.js";

async function initNuevos(){
    imprimirDatosAlumno();
    await obtenerLibros(); 
    const librosNuevos = libros.filter(libro => libro.esNuevo === true);
    console.log("Filtrados:", librosNuevos);
    mostrarProductos(librosNuevos);
}

initNuevos();*/

function imprimirDatosAlumno(){
    let datosAlumno = document.getElementById("datosAlumno");
    alumnos.forEach(alumno => {
        console.log(`Alumno: ${alumno.nombre}, Apellido: ${alumno.apellido}, DNI: ${alumno.dni}`);
        datosAlumno.innerHTML += `${alumno.nombre} ${alumno.apellido} </br>`;
    })

}


async function obtenerLibrosNuevos() {
    try {
        const respuesta = await fetch("http://localhost:3000/libros");
        libros = await respuesta.json();
        console.log(libros);
        
        mostrarLibrosNuevos(libros);
    }
    catch(error){
        console.error("Ocurrio un error: ", error)
    }
}

function mostrarLibrosNuevos(){
    let librosNuevos = libros.filter(libro => libro.esNuevo == true);
    console.log("Filtrados:", librosNuevos); 
    mostrarProductos(librosNuevos);
}

function mostrarProductos(array){
    contenedorProducto = "";

    array.forEach(libro => {
        contenedorProducto += `
            <div class="card-producto">
                <img src="${libro.ruta_img}" alt="${libro.titulo}">
                <h3>${libro.titulo}</h3>
                <p>${libro.autor}<p>
                <p class="p-precio">$${libro.precio.toLocaleString()}</p>
                <button onclick= "agregarAlCarrito(${libro.id})">Agregar al carrito</button>
            </div>
        `
    });

    listadoProductos.innerHTML = contenedorProducto;

}

obtenerLibrosNuevos();
