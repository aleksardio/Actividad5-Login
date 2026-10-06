const utileria = {
    validarCorreo: function(correo) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(correo);
    },
    validarPassword: function(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return regex.test(password);
    },

    soloLetras: function(texto) {
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        return regex.test(texto);
    },
    validarLongitud: function(texto, longitud) {
        return texto.length === longitud;
    },
    calcularEdad: function(fechaNacimiento) {
        const hoy = new Date();
        const nacimiento = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
        return edad < 0 ? 0 : edad; 
    },
    esMayorDeEdad: function(fechaNacimiento) {
        return utileria.calcularEdad(fechaNacimiento) >= 18;
    }
};

const { validarCorreo, validarPassword, soloLetras, validarLongitud, calcularEdad, esMayorDeEdad } = utileria;