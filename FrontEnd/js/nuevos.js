
import {mostrarProductos, listadoProductos, contenedorProducto, url, agregarAlCarrito } from "./main.js";

let librosNuevos = []


export async function obtenerLibrosEstado(buleano) {
    try {
        let respuesta = await fetch(`${url}/products`);
        console.log(`solicitud fetch GET a ${url}/products`);
        
        let data = await respuesta.json();
        console.log(data);

        librosNuevos = data.payload;

        filtrarLibrosEstado(buleano);
    }
    catch(error){
        console.error("Ocurrio un error: ", error)
    }
}

export function filtrarLibrosEstado(buleano){
    let filtrados = librosNuevos.filter(libro => libro.esNuevo == buleano);
    console.log("Filtrados:", librosNuevos); 
    mostrarProductos(filtrados);
}

obtenerLibrosEstado(1);

