let alumnos = [
    {dni:"46642416", nombre:"Malena", apellido:"Rodriguez Barrio"},
    {dni:"45071872", nombre:"Aisha", apellido:"Pereyra Sole"}
];

let libros = [];


let listadoProductos = document.getElementById("listadoProductos");
let contenedorProducto = "";

let barraBusqueda = document.getElementById("barraBusqueda");
let elementosCarrito = document.getElementById("elementosCarrito");

let totalCarrito = document.getElementById("totalCarrito");
let botonCarrito = document.getElementById("botonCarrito");

let contadorCarrito = document.getElementById("contadorCarrito");

let botonesOrdenar = document.getElementById("botonesSeccionProductos");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


init();

function init(){
    obtenerLibros();
    imprimirDatosAlumno();
    filtrarProductos();
    mostrarCarrito();
    actualizarContador();
    
}


async function obtenerLibros() {
    try {
        const respuesta = await fetch("http://localhost:3000/libros");
        libros = await respuesta.json();
        console.log(libros);

        mostrarProductos(libros);
    }
    catch(error){
        console.error("Ocurrio un error: ", error)
    }
}


/*
Imprimo mis datos a traves del console.log y luego los inserto en el header del documento con el innerHTML*/

function imprimirDatosAlumno(){
    let datosAlumno = document.getElementById("datosAlumno");
    alumnos.forEach(alumno => {
        console.log(`Alumno: ${alumno.nombre}, Apellido: ${alumno.apellido}, DNI: ${alumno.dni}`);
        datosAlumno.innerHTML += `${alumno.nombre} ${alumno.apellido} </br>`;
    })

}

/*Funcion que recorre con un forEach un array de objetos, donde por cada objeto crea un div con toda su información dentro.
Estos divs se guarda cada uno en una tarjetaProducto, la cual se agregará a traves del innerHTML a la seccion listadoProductos del html*/
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


function filtrarProductos(){
    barraBusqueda.addEventListener("keyup", function(){
        let itemBuscado = barraBusqueda.value.toLowerCase().trim();

        let itemsFiltrados = libros.filter(item => item.titulo.toLowerCase().includes(itemBuscado));

        mostrarProductos(itemsFiltrados);
    });

}


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

