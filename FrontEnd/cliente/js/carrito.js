let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let elementosCarrito = document.getElementById("elementosCarrito");
let totalCarrito = document.getElementById("totalCarrito");
let botonCarrito = document.getElementById("botonCarrito");
let contadorCarrito = document.getElementById("contadorCarrito");
let carritoPersonalizado = document.getElementById("carritoPersonalizado");
let botonPagar = document.getElementById("botonPagar");


function mostrarCarrito(){
    carritoPersonalizado.textContent = `Carrito de compras de ${localStorage.getItem('nombreCliente')}`;
    let total = 0;
    let contenedorCarrito = "";

    carrito.forEach((producto, indice) => {
        total += producto.cantidad * producto.precio;
        contenedorCarrito +=  `
        <li class="bloque-item">
            <img src="${producto.ruta_img}" alt="${producto.titulo}">
            <p class="nombre-item">${producto.titulo} - $${producto.precio.toLocaleString()}</p>
            <p>x ${producto.cantidad}</p>
            <button onclick="restarProducto(${indice})" class="boton-restar">
            <img src="./img-cliente/restar.png" alt="-">
            </button>
            <button onclick="sumarProducto(${indice})" class="boton-sumar">
            <img src="./img-cliente/sumar.png" alt="+">
            </button>
            <button onclick="eliminarProducto(${indice})" class="boton-eliminar">
            <img src="./img-cliente/tacho-basura.png" alt="X">
            </button>
        </li>`;
    });

    elementosCarrito.innerHTML = contenedorCarrito;
    totalCarrito.innerHTML = `<p>Total: $${total.toLocaleString()}</p>`;

    let accionVaciar = "";

    if (carrito.length > 0) { 
        accionVaciar = 
        `<button id="btnVaciar" class="btn-vaciar" onclick="vaciarCarrito()"> Vaciar carrito</button>
        <button id="btnPagar" class="btn-pagar" onclick="">Pagar</button>`;
    }
    botonCarrito.innerHTML = accionVaciar;

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function restarProducto(indice) {
    if (carrito[indice].cantidad > 1) {
        carrito[indice].cantidad--;
    } else {
        carrito.splice(indice, 1);
    }
    mostrarCarrito();
    actualizarContador();
}

function sumarProducto(indice) {
    carrito[indice].cantidad++;
    mostrarCarrito();
    actualizarContador();
}

function eliminarProducto(indice) {
    carrito.splice(indice, 1);
    mostrarCarrito();
    actualizarContador();
}

function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
    actualizarContador();
}

function actualizarContador() {
    let cantidadEnCarrito = 0;
    for (let i = 0; i < carrito.length; i++) {
        cantidadEnCarrito += carrito[i].cantidad;
    }
    contadorCarrito.innerHTML = `Cantidad: ${cantidadEnCarrito} productos`;
}

mostrarCarrito();

window.restarProducto = restarProducto;
window.sumarProducto = sumarProducto;
window.eliminarProducto = eliminarProducto;
window.vaciarCarrito = vaciarCarrito;
