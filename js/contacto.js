function validar_correo(correo_ingresado) {
    const formato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const dominios = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

    return formato.test(correo_ingresado) && dominios.some(function (dominio) {
        return correo_ingresado.endsWith(dominio);
    });
}

function mostrar_error(id, mensaje) {
    document.getElementById(id).textContent = mensaje;
}

document.getElementById("formulario_contacto").addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre_contacto").value.trim();
    const correo = document.getElementById("correo_contacto").value.trim();
    const comentario = document.getElementById("comentario_contacto").value.trim();
    let formulario_valido = true;

    mostrar_error("error_nombre", "");
    mostrar_error("error_correo", "");
    mostrar_error("error_comentario", "");
    document.getElementById("mensaje_contacto").classList.add("oculto");

    if (nombre === "" || nombre.length > 100) {
        mostrar_error("error_nombre", "Ingresa un nombre de hasta 100 caracteres.");
        formulario_valido = false;
    }
    if (!validar_correo(correo) || correo.length > 100) {
        mostrar_error("error_correo", "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.");
        formulario_valido = false;
    }
    if (comentario === "" || comentario.length > 500) {
        mostrar_error("error_comentario", "El comentario es obligatorio y debe tener hasta 500 caracteres.");
        formulario_valido = false;
    }
    if (formulario_valido) {
        document.getElementById("mensaje_contacto").textContent = "Consulta enviada correctamente. Te responderemos pronto.";
        document.getElementById("mensaje_contacto").classList.remove("oculto");
        document.getElementById("formulario_contacto").reset();
    }
});
