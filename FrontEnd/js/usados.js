

async function obtenerLibrosEstado(buleano) {
    try {
        const respuesta = await fetch("http://localhost:3000/libros");
        libros = await respuesta.json();
        console.log(libros);
        
        mostrarProductos(filtrarLibrosEstado(buleano));
    }
    catch(error){
        console.error("Ocurrio un error: ", error)
    }
}

function filtrarLibrosEstado(buleano){
    let librosFiltrados = libros.filter(libro => libro.esNuevo == buleano);
    console.log("Filtrados:", librosFiltrados); 
    return librosFiltrados;
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

obtenerLibrosEstado(false);

function agregarAlCarrito(id){
    let libroExistente = carrito.find(libroCarrito => libroCarrito.id == id);

    if (libroExistente){
        libroExistente.cantidad++;
    } 
    else {
        let libroBuscado = libros.find(libro => libro.id == id);
            carrito.push(
                {id: libroBuscado.id, titulo: libroBuscado.titulo, autor:libroBuscado.autor, precio: libroBuscado.precio, ruta_img: libroBuscado.ruta_img, cantidad:1}
            );
        }

    actualizarContador();
    mostrarCarrito();
    }
