import { initTema, imprimirDatosAlumno } from "./tema.js";
import { url } from "./main.js";

initTema();

const detalleLibro = document.getElementById("detalle-libro");

// Leer el ID desde la URL
const params = new URLSearchParams(window.location.search);  // es una clase de JavaScript que parsea los parámetros de la URL. Le pasás la cadena "?id=2" y te permite acceder a cada parámetro fácilmente.
const id = params.get("id"); // devuelve el valor del parámetro "id"

async function cargarLibro() {
    if(!id) {
        detalleLibro.innerHTML = "<p>No se especificó un libro</p>";
        return;
    }

    try {
        const response = await fetch(`${url}/api/products/${id}`);
        const data = await response.json();
    

        const libro = data.payload[0];

        mostrarDetalle(libro);

    } catch (error) {
        console.error(error);
        detalleLibro.innerHTML = "<p>Error al cargar el libro</p>";
    }
}

function mostrarDetalle(libro){
    detalleLibro.innerHTML = `
            <div class="contenedor-sinopsis">
                <div class="sinopsis-img">
                    <img src="${libro.ruta_img}" alt="${libro.titulo}">
                </div>
                
                <div class="sinopsis-detalle">
                    <div class="sinopsis-info">
                        <h2>${libro.titulo}</h2>
                        <p><strong>Autor:</strong> ${libro.autor}</p>
                        <p><strong>Estado del libro:</strong> ${libro.categoria}</p>
                        <p><strong>Precio:</strong> $${libro.precio.toLocaleString()}</p>
                        <p><strong>Sinopsis:</strong> ${libro.sinopsis}</p>
                    </div>
                    <div class="sinopsis-button">
                        <a href="index.html">
                            <button class="btn-volver">Volver a inicio</button>
                        </a>
                    </div>
                </div>
            </div>
                    `;
}

initTema();
cargarLibro();
