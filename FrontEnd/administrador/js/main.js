
    let contenedorProductos = document.getElementById("contenedor-productos");
    let url = "http://localhost:3000";

    async function obtenerProductos() {
        try {
            let response = await fetch(`${url}/`);

            console.log(`Solicitud fetch GET a ${url}/`);

            let data = await response.json();

            console.log(data);
            let productos = data.payload;
            console.log(productos);

            mostrarProductos(productos);

        } catch (error) {
            console.error("Error obteniendo productos: ", error);
        }
    }


    function mostrarProductos(array) {
        let htmlProductos = "";

        array.forEach(prod => {
            htmlProductos += `
                <div class="card-producto">
                    <img class="producto-img" src="${prod.ruta_img}" alt="${prod.titulo}">
                    <h3>${prod.titulo}</h3>
                    <p>Id: ${prod.id}</p>
                    <p>$${prod.precio}</p>
                </div>
            `;
        });

        contenedorProductos.innerHTML = htmlProductos;
    }

    function init() {
        obtenerProductos();
    }

    init();