$(document).ready(function() {
    verificarContenidoCarrito();

    $('.btn-add-to-cart').click(function() {
        var idProducto = $(this).data('id'); 
        var idUsuario = sessionStorage.getItem('idUsuario');

        if (!idUsuario) {
            window.location.href = 'login.html';
        } else {
            agregarAlCarrito(idProducto, idUsuario);
        }
    });

    function agregarAlCarrito(idProducto, idUsuario) {
        $.ajax({
            url: 'php/addCarrito.php',
            type: 'POST',
            dataType: 'json',
            data: {
                id_usuario: idUsuario,
                id_producto: idProducto,
                cantidad: 1
            },
            success: function(response) {
                if (response.success) {
                    alert('Producto añadido al carrito.');
                } else {
                    alert('No se pudo añadir el producto al carrito.');
                }
            },
            error: function() {
                alert('Ha ocurrido un error al intentar añadir el producto al carrito.');
            }
        });
    }

    function verificarContenidoCarrito() {
        var idUsuario = sessionStorage.getItem('idUsuario');

        if (!idUsuario) {
            mostrarMensajeCarritoVacio();
            return;
        }

        $.ajax({
            url: 'php/getCarrito.php',
            type: 'POST',
            dataType: 'json',
            data: { id_usuario: idUsuario },
            success: function(response) {
                if (response.length > 0) {
                    actualizarVistaCarrito(response);
                    $("#carritoVacio").hide(); 
                    $("#carritoLleno").show(); 
                } else {
                    mostrarMensajeCarritoVacio();
                }
            },
            error: function(xhr, status, error) {
                console.error("Error al verificar el carrito: " + error);
                mostrarMensajeCarritoVacio(); 
            }
        });
    }

    function mostrarMensajeCarritoVacio() {
        $("#carritoVacio").show();
        $("#carritoLleno").hide();
    }

    function actualizarVistaCarrito(items) {
        var totalCarrito = 0;
        var contenidoCarrito = '';

        items.forEach(function(item) {
            var precio = parseFloat(item.precio.replace(',', '.'));
            var subtotal = precio * item.cantidad;
            totalCarrito += subtotal;
            
            contenidoCarrito += `
                <tr>
                    <td>${item.nombre}</td>
                    <td>${precio.toFixed(2)} €</td>
                    <td>${item.cantidad}</td>
                    <td>${subtotal.toFixed(2)} €</td>
                    <td>
                        <button class="btn btn-danger btn-sm btn-quitar-uno" data-id="${item.idProducto}" data-cantidad="${item.cantidad}">Quitar uno</button>
                        <button class="btn btn-warning btn-sm btn-quitar-todos" data-id="${item.idProducto}">Quitar todos</button>
                    </td>
                </tr>
            `;
        });

        $('#carritoProductos').html(contenidoCarrito);
        $('#totalCarrito').text(totalCarrito.toFixed(2));
        $('#carritoLleno').show();
    }

    function mostrarMensajeCarritoVacio() {
        $('#carritoVacio').show();
        $('#carritoLleno').hide();
    }

    $(document).on('click', '.btn-quitar-uno', function() {
        var idProducto = $(this).data('id');
        var cantidadActual = parseInt($(this).data('cantidad'));
        var nuevaCantidad = cantidadActual - 1;

        if (nuevaCantidad > 0) {
            actualizarCantidadProducto(idProducto, nuevaCantidad);
        } else {
            quitarProducto(idProducto);
        }
    });

    $(document).on('click', '.btn-quitar-todos', function() {
        var idProducto = $(this).data('id');
        quitarProducto(idProducto);
    });

    function actualizarCantidadProducto(idProducto, cantidad) {

        var idUsuario = sessionStorage.getItem('idUsuario');
        if (!idUsuario) {
            window.location.href = 'login.html'; 
            return;
        }

        $.ajax({
            url: 'php/actualizarCantidadCarrito.php',
            type: 'POST',
            data: {
                id_usuario: idUsuario,
                id_producto: idProducto,
                cantidad: cantidad
            },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    verificarContenidoCarrito();
                } else {
                    alert('No se pudo actualizar la cantidad del producto. ' + response.error);
                }
            },
            error: function(xhr, status, error) {
                alert('Error al actualizar el producto: ' + error);
            }
        });
    }

    function quitarProducto(idProducto) {
        var idUsuario = sessionStorage.getItem('idUsuario');
        if (!idUsuario) {
            window.location.href = 'login.html'; 
            return;
        }

        $.ajax({
            url: 'php/quitarProductoCarrito.php',
            type: 'POST',
            data: {
                id_usuario: idUsuario,
                id_producto: idProducto
            },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    alert('Producto eliminado del carrito correctamente.');
                    verificarContenidoCarrito();
                } else {
                    alert('No se pudo eliminar el producto: ' + response.error);
                }
            },
            error: function(xhr, status, error) {
                alert('Error al eliminar el producto: ' + error);
            }
        });
    }


});
