
export function verificarLogin() {
    const usuario = localStorage.getItem("nombreCliente");
    if (!usuario){
        window.location.replace("inicioCliente.html");
        return null;
    }
    return usuario;
}