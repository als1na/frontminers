$(document).ready(function() {
    var idUsuario = sessionStorage.getItem('idUsuario');
    
    if (!idUsuario) {
        window.location.href = 'login.html';
    } else {
        $.ajax({
            url: 'php/verMisPedidos.php',
            type: 'POST',
            dataType: 'json',
            data: { id_usuario: idUsuario },
            success: function(pedidos) {
                if (pedidos.length === 0) {
                    $('#listaPedidos').append('<tr><td colspan="4" class="text-center">No has realizado pedidos aún.</td></tr>');
                } else {
                    pedidos.forEach(function(pedido) {
                        $('#listaPedidos').append(`
                            <tr>
                                <td>${pedido.id_pedido}</td>
                                <td>${pedido.fecha}</td>
                                <td>${parseFloat(pedido.monto).toFixed(2)} €</td>
                                <td>${pedido.estado}</td>
                            </tr>
                        `);
                    });
                }
            },
            error: function() {
                alert('Error al cargar los pedidos.');
            }
        });
    }
});
