import { initTema, imprimirDatosAlumno } from "./tema.js";
//import { imprimirDatosAlumno } from "./main.js";
initTema();
imprimirDatosAlumno();

const formularioCliente = document.getElementById('formularioCliente');
const inputCliente = document.getElementById('cliente');

if (localStorage.getItem('nombreCliente')) {
    localStorage.removeItem('nombreCliente');
}

formularioCliente.addEventListener('submit', function(evento) {
    evento.preventDefault(); 

    const nombreCliente = inputCliente.value.trim();

    if (nombreCliente) {
        localStorage.setItem('nombreCliente', nombreCliente);
        window.location.href = 'index.html';

    } else {
        alert('Por favor ¡¡¡ingresa tu nombre para continuar!!!');
    }
    
});
