

function mostrarCarrito(){
    let total = 0;
    let contenedorCarrito = "";

    carrito.forEach((producto, indice) => {
        total +=  producto.cantidad * producto.precio;
        contenedorCarrito +=  `
            <li class="bloque-item">
                
                <p class="nombre-item">${producto.titulo} - $${producto.precio.toLocaleString()}</p>
                <p>x ${producto.cantidad}</p>
                <button onclick="eliminarProducto(${indice})" class="boton-eliminar">
                    <img src="./img/tacho-basura.png" alt="">
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
            `<button id="btnVaciar" class="btn-vaciar" onclick="vaciarCarrito()"> Vaciar carrito</button>`;
    }

    botonCarrito.innerHTML = accionVaciar;

    /*Punto 6 */
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

/*Esta funcion primero chequea si  el producto tiene más de 1 repeticion, si esto se cumple, disminuye la cantidad (cantidad--).
Y si solo queda 1 lo elimina completamente del array llamando al método splice el cual elimina 1 elemento en la posicion indicada por "indice" */

function eliminarProducto(indice){
    if (carrito[indice].cantidad > 1){
        carrito[indice].cantidad--;
        
    }
    else {
        carrito.splice(indice,1);
    }
    mostrarCarrito();
    actualizarContador();
}


/*
Se reinicia el carrito declarandolo como vacio*/
function vaciarCarrito(){
    carrito = [];
    mostrarCarrito();
    actualizarContador();
}

/*
Esta función se encarga de llevar el conteo de los productos en nuestro carrito cada vez que sucede alguna modificación */
function actualizarContador(){
    let cantidadEnCarrito = 0;
    for (let i = 0; i < carrito.length; i++) {
        cantidadEnCarrito += carrito[i].cantidad;
    }
    contadorCarrito.innerHTML = `Cantidad: ${cantidadEnCarrito} productos`;
}

