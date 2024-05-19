$(document).ready(function () {
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href"); 
        if (target === "#verProductos") {
            cargarProductos();
        }
    });

    function cargarProductos() {
        $.ajax({
            url: 'php/verProductos.php',
            type: 'POST',
            dataType: 'json',
            success: function(productos) {
                var contenidoTabla = '';
                if (productos.length > 0) {
                    productos.forEach(function(producto) {
                        contenidoTabla += `<tr>
                            <td>${producto.id_producto}</td>
                            <td>${producto.nombre}</td>
                            <td>${producto.descripcion1 || ''}</td>
                            <td>${producto.descripcion2 || ''}</td>
                            <td>${producto.descripcion3 || ''}</td>
                            <td>${producto.descripcion4 || ''}</td>
                            <td>${parseFloat(producto.precio).toFixed(2)} €</td>
                            <td>${producto.stock}</td>
                            <td><a href="editarProducto.html?id=${producto.id_producto}" class="btn btn-primary">Editar</a></td>
                        </tr>`;
                    });
                } else {
                    contenidoTabla = '<tr><td colspan="9" class="text-center">No hay productos disponibles</td></tr>';
                }
                $('#listaProductos').html(contenidoTabla);
            },
            error: function() {
                alert('No se pudo cargar la información de los productos.');
            }
        });
    }
});
