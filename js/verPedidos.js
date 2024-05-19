$(document).ready(function () {
    
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href"); 
        if (target === "#verPedidos") {
            cargarPedidos(); 
        }
    });

    function cargarPedidos() {
        $.ajax({
            url: 'php/verPedidos.php',
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                $('#listaPedidos').empty();
                if(data.length > 0) {
                    data.forEach(function(pedido) {
                        var fila = `<tr>
                                        <td>${pedido.id_pedido}</td>
                                        <td>${pedido.nombre}</td>
                                        <td>${pedido.correo}</td>
                                        <td>${pedido.fecha}</td>
                                        <td>${parseFloat(pedido.monto).toFixed(2)} €</td>
                                        <td>${pedido.estado}</td>
                                        <td>
                                            <button onclick="cambiarEstado(${pedido.id_pedido}, '${pedido.estado}')" class="btn btn-success">Enviar</button>
                                            <button onclick="eliminarPedido(${pedido.id_pedido})" class="btn btn-danger">Eliminar</button>
                                        </td>
                                    </tr>`;
                        $('#listaPedidos').append(fila);
                    });
                } else {
                    $('#listaPedidos').html('<tr><td colspan="7" class="text-center">No se encontraron pedidos</td></tr>');
                }
            },
            error: function() {
                alert('No se pudo cargar la información de los pedidos.');
            }
        });
    }

    window.cambiarEstado = function(idPedido, estadoActual) {
        var nuevoEstado = estadoActual === 'pendiente' ? 'enviado' : 'aceptada';
        $.ajax({
            url: 'php/cambiarEstadoPedido.php',
            type: 'POST',
            data: { id_pedido: idPedido, estado: nuevoEstado },
            dataType: 'json', 
            success: function(response) {
                if (response.success) {
                    alert('El estado ha sido actualizado a ' + nuevoEstado);
                    location.reload(); 
                } else {
                    alert(response.error || 'Error al actualizar el estado del pedido.'); 
                }
            },
            error: function(xhr, status, error) {
                console.error('Error en la solicitud AJAX: ' + error);
                alert('Error al realizar la solicitud de cambio de estado.');
            }
        });
    }

    window.eliminarPedido = function(idPedido) {
        var confirmacion = confirm("¿Está seguro de que desea eliminar este pedido?");
        if (confirmacion) {
            $.ajax({
                url: 'php/eliminarPedido.php',
                type: 'POST',
                dataType: 'json',  
                data: { id_pedido: idPedido },
                success: function(response) {
                    console.log(response);  
                    if(response.success) {
                        alert('Pedido eliminado con éxito.');
                        cargarPedidos();  
                    } else {
                        alert('No se pudo eliminar el pedido: ' + (response.error || 'Error desconocido'));
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Error en la solicitud AJAX:', error);
                    alert('Error al eliminar el pedido. Por favor, intente de nuevo.');
                }
            });
        }
    }


});



