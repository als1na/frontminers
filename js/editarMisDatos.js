$(document).ready(function() {
    cargarDatosUsuario();

    $('#datosForm').submit(function(e) {
        e.preventDefault();
        actualizarDatosUsuario();
    });
});

function cargarDatosUsuario() {
    var idUsuario = sessionStorage.getItem('idUsuario');
    console.log("ID de usuario:", idUsuario); 

    if (!idUsuario) {
        window.location.href = 'login.html';
        return;
    }

    $.ajax({
        url: 'php/editarMisDatos.php',
        type: 'GET',
        dataType: 'json',
        data: {
            id_usuario: idUsuario 
        },
        success: function(data) {
            $('#nombre').val(data.nombre).data('original', data.nombre);
            $('#correo').val(data.correo_electronico).data('original', data.correo_electronico);
            $('#contrasena').val(data.contrasena);  
            $('#direccion').val(data.direccion);
        },
        error: function() {
            alert('Error al cargar los datos del usuario.');
        }
    });
}


function actualizarDatosUsuario() {
    var idUsuario = sessionStorage.getItem('idUsuario');
    if (!idUsuario) {
        window.location.href = 'login.html';
        return;
    }

    var nombreOriginal = $('#nombre').data('original');
    var correoOriginal = $('#correo').data('original');
    var nombre = $('#nombre').val();
    var correo = $('#correo').val();
    var contrasena = $('#contrasena').val();
    var direccion = $('#direccion').val();

    $.ajax({
        url: 'php/editarMisDatos.php',
        type: 'POST',
        data: {
            id_usuario: idUsuario,
            nombre: nombre,
            correo: correo,
            contrasena: contrasena,
            direccion: direccion
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
