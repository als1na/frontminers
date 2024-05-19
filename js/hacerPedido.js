$(document).ready(function() {
    $('#hacerPedido').click(function () {
        var totalCarrito = parseFloat($('#totalCarrito').text());
        var confirmar = confirm('¿Estás seguro de que deseas realizar el pedido?');
        if (confirmar) {
            realizarPedido(totalCarrito);
        }
    });

    function realizarPedido(total) {
        var idUsuario = sessionStorage.getItem('idUsuario');
        var usuarioCorreo = sessionStorage.getItem('correo');

        if (!idUsuario) {
            window.location.href = 'login.html';
            return;
        }

        $.ajax({
            url: 'php/hacerPedido.php',
            type: 'POST',
            data: {
                id_usuario: idUsuario,
                correo: usuarioCorreo,  
                total: total
            },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    alert('Pedido realizado con éxito.');
                    $('#carritoProductos').empty();
                    $('#totalCarrito').text('0.00');
                    $('#carritoVacio').show();
                    $('#carritoLleno').hide();
                } else {
                    alert('Hubo un problema al realizar el pedido.');
                }
            },
            error: function(xhr, status, error) {
                console.error("Error al realizar el pedido: " + error);
            }
        });
    }

    paypal.Buttons({
        style: {
            layout: 'horizontal',
            color: 'gold',    
            shape: 'rect'
        },
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: $('#totalCarrito').text()
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Transacción completada por ' + details.payer.name.given_name);
                var totalCarrito = parseFloat($('#totalCarrito').text());
                realizarPedido(totalCarrito);
            });
        }
    }).render('#paypal-button-container'); 
});
