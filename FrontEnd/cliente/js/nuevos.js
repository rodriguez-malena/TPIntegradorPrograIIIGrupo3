import { mostrarProductos, setProductosActuales, url } from "./main.js";

let librosNuevos = [];

export async function obtenerLibrosEstado(estado) {
    try {
        let respuesta = await fetch(`${url}/api/products`);
        let data = await respuesta.json();

        librosNuevos = data.payload;

        // Filtrar por la categoría pedida
        let filtrados = filtrarLibrosEstado(estado);

        setProductosActuales(filtrados);

        // Mostrar solo los nuevos
        mostrarProductos(filtrados);

    } catch(error) {
        console.error("Ocurrió un error: ", error);
    }
}

export function filtrarLibrosEstado(estado) {
    let filtrados = librosNuevos.filter(libro => 
        libro.categoria.toLowerCase() === estado.toLowerCase()
    );
    console.log("Filtrados:", filtrados);
    return filtrados;  
}

obtenerLibrosEstado("Nuevo");
