$(document).ready(function () {
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href");
        if (target === "#verUsuarios") {
            cargarUsuarios();
        }
    });
});

function cargarUsuarios() {
    $.ajax({
        url: 'php/verUsuarios.php',
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            $('#listaUsuarios').empty();
            if(data.length > 0) {
                data.forEach(function(usuario) {
                    var fila = `<tr>
                                    <td>${usuario.id_usuario}</td>
                                    <td>${usuario.nombre}</td>
                                    <td>${usuario.correo}</td>
                                    <td>${usuario.direccion}</td>
                                    <td>
                                        <button onclick="eliminarUsuario(${usuario.id_usuario})" class="btn btn-danger">Eliminar</button>
                                    </td>
                                </tr>`;
                    $('#listaUsuarios').append(fila);
                });
            } else {
                $('#listaUsuarios').html('<tr><td colspan="4" class="text-center">No se encontraron usuarios</td></tr>');
            }
        },
        error: function() {
            alert('Error al cargar la información de los usuarios.');
        }
    });
}

function eliminarUsuario(idUsuario) {
    var confirmacion = confirm("¿Está seguro de que desea eliminar este usuario?");
    if (confirmacion) {
        $.ajax({
            url: 'php/eliminarUsuario.php',
            type: 'POST',
            data: { id_usuario: idUsuario },
            dataType: 'json',
            success: function(response) {
                if(response.success) {
                    alert('Usuario eliminado con éxito.');
                    cargarUsuarios();
                } else {
                    alert('No se pudo eliminar el usuario.');
                }
            },
            error: function() {
                alert('Error al eliminar el usuario.');
            }
        });
    }
}
