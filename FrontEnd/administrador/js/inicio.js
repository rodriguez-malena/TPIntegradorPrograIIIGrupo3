const formularioAdministrador = document.getElementById('formularioAdministrador');
const inputAdministrador = document.getElementById('administrador');
const clave = document.getElementById('clave');
let alumnos = [
    {dni:"46642416", nombre:"Malena", apellido:"Rodriguez Barrio"},
    {dni:"45071872", nombre:"Aisha", apellido:"Pereyra Sole"}
];


formularioAdministrador.addEventListener('submit', function(evento) {
    evento.preventDefault(); 
    const mailAdministrador = inputAdministrador.value.trim();
    if (mailAdministrador && clave.value) {
        window.location.href = 'http://localhost:3000';
    } else {
        alert('Por favor, llene los campos');
    }
    init();
});


// Habría que importarla y/o ver de declararla en un lugar que no corresponda ni a cliente ni a admin
function imprimirDatosAlumno(){
    let datosAlumno = document.getElementById("datosAlumno");
    alumnos.forEach(alumno => {
        console.log(`Alumno: ${alumno.nombre}, Apellido: ${alumno.apellido}, DNI: ${alumno.dni}`);
        datosAlumno.innerHTML += `${alumno.nombre} ${alumno.apellido} </br>`;
    })
    
}  

imprimirDatosAlumno();