
let libros = [
    {id:1, titulo: "El Principito", precio: 10000, ruta_img: "https://images.cdn3.buscalibre.com/fit-in/360x360/c2/f7/c2f7429ecf0d0c11deab46100022e2ad.jpg"},
    {id:2, titulo: "Deja de ser tú", precio: 17000, ruta_img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-RXJiImQaE2MXBM7haLVJ_XdNu1olqCmeqQ&s" },
    {id:3, titulo: "El Psicoanalista", precio: 20000, ruta_img: "https://images.cdn3.buscalibre.com/fit-in/360x360/4e/80/4e8044521f1735d079405967f70da84c.jpg" },
    {id:4, titulo: "Diez Negritos", precio: 15000, ruta_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE6wWqco43viShrR9NDNaPIVNHiBIyX3tOKitGnooOCeLayYzU6KSQBIempxw2-Lfvb-E&usqp=CAU" },
    {id:5, titulo: "El retrato de Dorian Gray", precio: 13000, ruta_img:"https://images.cdn1.buscalibre.com/fit-in/360x360/39/57/3957c8756494c0958f26ed04712ae63f.jpg" },
    {id:6, titulo: "Hecha de estrellas", precio:18000, ruta_img: "https://imgv2-1-f.scribdassets.com/img/word_document/438247586/original/216x287/59b0043d55/1753104632?v=1"}
]

let alumnos = [
    {dni:"46642416", nombre:"Malena", apellido:"Rodriguez Barrio"},
    {dni:"45071872", nombre:"Aisha", apellido:"Pereyra Sole"}
];

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
    imprimirDatosAlumno();
    mostrarProductos(libros);
    filtrarProductos();
    mostrarCarrito();
    actualizarContador();
    
}

/*Punto 2 
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
                <p>$${libro.precio}</p>
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
                {id: libroBuscado.id, titulo: libroBuscado.titulo, precio: libroBuscado.precio, ruta_img: libroBuscado.ruta_img, cantidad:1}
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
                <p class="nombre-item">${producto.titulo} - $${producto.precio}</p>
                <p>x ${producto.cantidad}</p>
                <button onclick="eliminarProducto(${indice})" class="boton-eliminar">Eliminar</button>
            </li>

            `;
});
    elementosCarrito.innerHTML = contenedorCarrito;
    console.log(carrito);

    totalCarrito.innerHTML =  `<p>Total: $${total}</p>`;

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


/*Punto 9 
Se reinicia el carrito declarandolo como vacio*/
function vaciarCarrito(){
    carrito = [];
    mostrarCarrito();
    actualizarContador();
}

/*Punto 7
Esta función se encarga de llevar el conteo de los productos en nuestro carrito cada vez que sucede alguna modificación */
function actualizarContador(){
    let cantidadEnCarrito = 0;
    for (let i = 0; i < carrito.length; i++) {
        cantidadEnCarrito += carrito[i].cantidad;
    }
    contadorCarrito.innerHTML = `Cantidad: ${cantidadEnCarrito} productos`;
}

/*const form = document.getElementById('formularioCliente');
const dataInput = document.getElementById('cliente');


form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const nombreCliente = dataInput.value;
    localStorage.setItem('miCliente', nombreCliente);

    
    window.location.href = 'index.html';
    });*/


