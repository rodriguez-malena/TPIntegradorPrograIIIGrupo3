const form = document.getElementById('formularioCliente');
    const dataInput = document.getElementById('cliente');


    form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    
    const nombreCliente = cliente.value;
    localStorage.setItem('miCliente', nombreCliente);

    
    window.location.href = 'index.html';
    });