
const formularioCliente = document.getElementById('formularioCliente');
const inputCliente = document.getElementById('cliente');



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

