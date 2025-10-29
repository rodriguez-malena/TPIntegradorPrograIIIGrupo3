
let librosNuevos = [];



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
    librosNuevos = libros.filter(libro => libro.esNuevo == true);
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