

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
