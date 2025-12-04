function calcularEdad() {
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const edadInput = document.getElementById('edad');

    // VALIDAR NOMBRE
    if (nombre === "") {
        alert("Por favor ingrese su nombre.");
        return false;
    }
    if (/\d/.test(nombre)) {
        alert("El nombre no debe contener números.");
        return false;
    }

    // VALIDAR APELLIDOS
    if (apellido === "") {
        alert("Por favor ingrese sus apellidos.");
        return false;
    }
    if (/\d/.test(apellido)) {
        alert("Los apellidos no deben contener números.");
        return false;
    }

    // VALIDAR CORREO
    if (email === "") {
        alert("Por favor ingrese su correo electrónico.");
        return false;
    }
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        alert("Por favor ingrese un correo electrónico válido.");
        return false;
    }

    // VALIDAR MENSAJE
    if (mensaje === "") {
        alert("Por favor ingrese su mensaje.");
        return false;
    }
    if (mensaje.length < 5) {
        alert("El mensaje debe contener al menos 5 caracteres.");
        return false;
    }

    // VALIDAR FECHA DE NACIMIENTO
    if (!fechaNacimiento) {
        alert("Por favor seleccione su fecha de nacimiento.");
        return false;
    }

    const fechaNac = new Date(fechaNacimiento);
    const hoy = new Date();

    if (fechaNac > hoy) {
        alert("La fecha de nacimiento no puede ser futura.");
        return false;
    }

    // CALCULAR EDAD
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
    }

    if (edad < 0 || edad > 120) {
        alert("La fecha de nacimiento no parece correcta.");
        return false;
    }

    // Guardar la edad en el input oculto para que viaje en el formulario
    edadInput.value = edad;

    // Todo bien: se envía el formulario
    return true;
}
