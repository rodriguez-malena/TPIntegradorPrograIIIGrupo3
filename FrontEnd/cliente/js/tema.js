

export function initTema() {
    const body = document.body;
    const cambiarTema = document.getElementById("cambiarTema");

    if (!cambiarTema) return;  // Evita errores si la página no tiene el botón

    // Estado inicial del modo
    body.classList.toggle('tema2', localStorage.getItem('modo')==='t2')

    cambiarTema.addEventListener('click', () => {
    let tema = body.classList.toggle('tema2');
    localStorage.setItem('modo', tema ? 't2' : 't1')
    });
}

export const alumnos = [
    {dni:"46642416", nombre:"Malena", apellido:"Rodriguez Barrio"},
    {dni:"45071872", nombre:"Aisha", apellido:"Pereyra Sole"}
];

export function imprimirDatosAlumno(){
    let datosAlumno = document.getElementById("datosAlumno");
    alumnos.forEach(alumno => {
        console.log(`Alumno: ${alumno.nombre}, Apellido: ${alumno.apellido}, DNI: ${alumno.dni}`);
        datosAlumno.innerHTML += `${alumno.nombre} ${alumno.apellido} </br>`;
    })
    
}