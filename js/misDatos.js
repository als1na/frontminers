$(document).ready(function() {
    cargarDatosUsuario();

    $('#datosForm').submit(function(e) {
        e.preventDefault();
        actualizarDatosUsuario();
    });
});

function cargarDatosUsuario() {
    $.ajax({
        url: 'php/misDatos.php',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            $('#nombre').val(data.nombre).data('original', data.nombre);
            $('#correo').val(data.correo_electronico).data('original', data.correo_electronico);
            $('#contrasena').val(data.contrasena);  
        },
        error: function() {
            alert('Error al cargar los datos del usuario.');
        }
    });
}


function actualizarDatosUsuario() {
    var nombreOriginal = $('#nombre').data('original');
    var correoOriginal = $('#correo').data('original');
    var nombre = $('#nombre').val();
    var correo = $('#correo').val();
    var contrasena = $('#contrasena').val();

    $.ajax({
        url: 'php/misDatos.php',
        type: 'POST',
        data: {
            nombre: nombre,
            correo: correo,
            contrasena: contrasena
        },
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                alert('Datos actualizados correctamente.');
                if (nombre !== nombreOriginal || correo !== correoOriginal) {
                    alert('Debe iniciar sesión de nuevo debido a la actualización de su nombre o correo electrónico.');
                    sessionStorage.clear();
                    window.location.href = 'login.html';
                }
            } else {
                alert(response.error || 'No se pudieron actualizar los datos.');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error al actualizar los datos: ' + error);
            alert('Error al actualizar los datos.');
        }
    });
}


