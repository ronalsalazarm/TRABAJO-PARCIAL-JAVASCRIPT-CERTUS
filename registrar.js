

const formulario = document.getElementById("formulario"); /* Para acceder al formulario  */
const inputs = document.querySelectorAll("#formulario input"); /* Aqui se almacena todo los inputs del formulario */

const expresiones = { /* Objeto expresiones  con sus propiedades*/
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

const campos = {
    nombre: false,
    apellido: false,
    correo: false,
}

const validarFormulario = (e) => { /* Función tipo flecha  */
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "apellido":
            validarCampo(expresiones.apellido, e.target, 'apellido');
            break;
        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
            break;  
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) { /* Si es correcta se ejecuta */
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto'); /* acceder a la lista de clases */
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else { /* Si es falsa se ejecuta  */
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-ckeck-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = true;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);

});

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    if (campos.nombre && campos.apellido && campos.correo ) {
        formulario.reset();

        document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");
        setTimeout(() => {
            document.getElementById("formulario__mensaje-exito").classList.remove("formulario__mensaje-exito-activo");
        }, 5000);

        /* Para quitar todos los iconos  */
        document.querySelectorAll(".formulario__grupo-correcto").forEach((icono) => {
            icono.classList.remove("formulario__grupo-correcto");
        })
    } else {
        document.getElementById("formulario__mensaje").classList.add("formulario__mensaje-activo");
    }
});


