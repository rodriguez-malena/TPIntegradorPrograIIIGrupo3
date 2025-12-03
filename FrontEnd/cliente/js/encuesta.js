import { initTema, imprimirDatosAlumno } from "./tema.js";
initTema();
imprimirDatosAlumno();

document.addEventListener('DOMContentLoaded', () => {

    const formulario = document.getElementById('formularioCliente');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que se recargue la página

        const errores = [];
        const email = document.getElementById('email').value.trim();
        const calificacion = document.getElementById('calificacion').value;
        const comentarios = document.getElementById('comentarios').value.trim();
        const archivo = document.getElementById('myfile').files[0];
        const primeravez = document.getElementById('nuevo').checked ? 'Si' : 'No';

        if(!email){
            errores.push("El correo es obligatorio.");
        }

        if(!comentarios){
            errores.push("Los comentarios no pueden estar vacíos.");
        }

        if(archivo) {
            const permitidos = ['image/jpeg', 'image/png', 'image/gif'];
            if(!permitidos.includes(archivo.type)) errores.push("Solo se permiten imágenes jpg, png o gif.");
        }

        // Mostrar errores si existen
        if(errores.length > 0) {
            alert(errores.join('\n'));
            return;
        }

        // Preparar y enviar datos al backend remoto
        enviarFormulario({ email, calificacion, comentarios, archivo, primeravez });
    });

    // Función para enviar datos
    function enviarFormulario(data) {
        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('calificacion', data.calificacion);
        formData.append('comentarios', data.comentarios);
        formData.append('primeravez', data.primeravez);
        if(data.archivo) formData.append('archivo', data.archivo);
        formData.append('fecha', new Date().toISOString()); // Fecha actual

        const backendURL = 'https://tu-backend.com/api/guardarEncuesta'; // Cambiar por tu URL real

        fetch(backendURL, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(response => {
            if(response.success) {
                alert("Gracias");
                window.location.href = '/inicioCliente.html';
            } else {
                alert("Error al enviar la encuesta: " + response.message);
            }
        })
        .catch(err => {
            console.error('Error:', err);
            alert("Ocurrió un error al enviar la encuesta.");
        });
    }

});