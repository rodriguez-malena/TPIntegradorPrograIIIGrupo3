const formularioCliente = document.getElementById('formularioCliente');
const inputCliente = document.getElementById('cliente');
let alumnos = [
    {dni:"46642416", nombre:"Malena", apellido:"Rodriguez Barrio"},
    {dni:"45071872", nombre:"Aisha", apellido:"Pereyra Sole"}
];


formularioCliente.addEventListener('submit', function(evento) {
    evento.preventDefault(); 
    const nombreCliente = inputCliente.value.trim();
    if (nombreCliente) {
        localStorage.setItem('nombreCliente', nombreCliente);
        window.location.href = 'index.html';
    } else {
        alert('Por favor ¡¡¡ingresa tu nombre para continuar!!!');
    }
    init();
});


function imprimirDatosAlumno(){
    let datosAlumno = document.getElementById("datosAlumno");
    alumnos.forEach(alumno => {
        console.log(`Alumno: ${alumno.nombre}, Apellido: ${alumno.apellido}, DNI: ${alumno.dni}`);
        datosAlumno.innerHTML += `${alumno.nombre} ${alumno.apellido} </br>`;
    })

}

imprimirDatosAlumno();