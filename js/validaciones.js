$(document).ready(function () {

    // Validación visual del nombre
    $('#nombre').on('blur', function () {
        var nombre = $(this).val().trim();
        if (nombre.length < 3 || /\d/.test(nombre)) {
            $(this).removeClass('is-valid').addClass('is-invalid');
        } else {
            $(this).removeClass('is-invalid').addClass('is-valid');
        }
    });

    // Validación visual del apellido
    $('#lastName').on('blur', function () {
        var apellido = $(this).val().trim();
        if (apellido.length < 3 || /\d/.test(apellido)) {
            $(this).removeClass('is-valid').addClass('is-invalid');
        } else {
            $(this).removeClass('is-invalid').addClass('is-valid');
        }
    });

    // Validación visual del correo
    $('#email').on('blur', function () {
        var email = $(this).val().trim();
        var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            $(this).removeClass('is-valid').addClass('is-invalid');
        } else {
            $(this).removeClass('is-invalid').addClass('is-valid');
        }
    });

    // Validación visual del mensaje
    $('#mensaje').on('blur', function () {
        var mensaje = $(this).val().trim();
        if (mensaje.length < 5) {
            $(this).removeClass('is-valid').addClass('is-invalid');
        } else {
            $(this).removeClass('is-invalid').addClass('is-valid');
        }
    });

    // Fecha de nacimiento: marcar válida/ inválida (el cálculo real lo hace sendEmail.js)
    $('#fechaNacimiento').on('change', function () {
        if (!$(this).val()) {
            $(this).removeClass('is-valid').addClass('is-invalid');
        } else {
            $(this).removeClass('is-invalid').addClass('is-valid');
        }
    });

    // Rango de ingreso: ya se actualiza el texto en el HTML, aquí solo marcamos válido
    $('#rangoIngreso').on('input', function () {
        var valor = parseInt($(this).val(), 10) || 0;
        $('#rangoValor').text('¢' + valor.toLocaleString('es-CR'));

        if (valor > 0) {
            $(this).removeClass('is-invalid').addClass('is-valid');
        } else {
            $(this).removeClass('is-valid').addClass('is-invalid');
        }
    });

    // Grado académico: válido si hay al menos una opción seleccionada
    $('#gradoAcademico').on('change', function () {
        var seleccionados = $(this).val();
        if (seleccionados && seleccionados.length > 0) {
            $(this).removeClass('is-invalid').addClass('is-valid');
        } else {
            $(this).removeClass('is-valid').addClass('is-invalid');
        }
    });

});
