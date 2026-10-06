// Seleccionamos el formulario de login
const loginForm = document.getElementById('loginForm');

// Escuchamos el evento cuando el usuario intenta enviar el formulario
loginForm.addEventListener('submit', function(event) {
    // Evitamos que la página se recargue por defecto
    event.preventDefault();

    // Extraemos lo que el usuario escribió
    const correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value;

    // 1. Validamos el correo usando utileria.js
    if (!utileria.validarCorreo(correo)) {
        alert('Por favor, ingresa un correo electrónico válido (ej: alumno@itoaxaca.edu.mx).');
        return; // Detiene la ejecución si falla
    }

    // 2. Validamos la contraseña (Regla de Chanclas: min 8, mayúscula, minúscula, número y símbolo)
    if (!utileria.validarPassword(password)) {
        alert('La contraseña debe tener mínimo 8 caracteres, incluir mayúscula, minúscula, un número y un símbolo especial.');
        return; // Detiene la ejecución si falla
    }

    // 3. Si pasa las validaciones, guardamos el correo para que el Navbar lo lea
    localStorage.setItem('usuarioSesion', correo);
    
    // 4. Mostramos mensaje de éxito y mandamos al index
    alert('Acceso correcto. Entrando al sistema...');
    window.location.href = 'index.html';
});