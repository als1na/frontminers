$(document).ready(function() {
    var idProducto = new URLSearchParams(window.location.search).get('id');
    if (idProducto) {
        cargarDatosProducto(idProducto);
    }

    function cargarDatosProducto(idProducto) {
        $.ajax({
            url: 'php/buscaProducto.php',
            type: 'GET',
            data: { id_producto: idProducto },
            dataType: 'json',
            success: function(producto) {
                if (producto) {
                    $('#id_producto').val(producto.id_producto);
                    $('#nombre').val(producto.nombre);
                    $('#descripcion1').val(producto.descripcion1);
                    $('#descripcion2').val(producto.descripcion2);
                    $('#descripcion3').val(producto.descripcion3 || '').prop('disabled', !producto.descripcion3);
                    $('#descripcion4').val(producto.descripcion4 || '').prop('disabled', !producto.descripcion4);
                    $('#precio').val(parseFloat(producto.precio));
                    $('#stock').val(producto.stock);
                } else {
                    alert('Producto no encontrado.');
                }
            },
            error: function() {
                alert('Error al cargar los datos del producto.');
            }
        });
    }
});
