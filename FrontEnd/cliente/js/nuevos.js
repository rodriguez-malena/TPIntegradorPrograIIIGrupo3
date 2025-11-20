
import {mostrarProductos, listadoProductos, contenedorProducto, url, agregarAlCarrito } from "./main.js";

let librosNuevos = []


export async function obtenerLibrosEstado(estado) {
    try {
        let respuesta = await fetch(`${url}/api/products`);
        console.log(`Solicitud fetch GET a ${url}/api/products`);
        
        let data = await respuesta.json();
        console.log(data);

        librosNuevos = data.payload;

        filtrarLibrosEstado(estado);
    }
    catch(error){
        console.error("Ocurrio un error: ", error)
    }
}

export function filtrarLibrosEstado(estado){
    let filtrados = librosNuevos.filter(libro => libro.categoria.toLowerCase() == estado.toLowerCase());
    console.log("Filtrados:", filtrados); 
    mostrarProductos(filtrados);
}

obtenerLibrosEstado("Nuevo");

