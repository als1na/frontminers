$(document).ready(function() {
    $.ajax({
        url: 'php/buscaAvalon.php', 
        type: 'GET', 
        dataType: 'json', 
        success: function(producto) {
            $('.nameProd').text(producto.nombre);
            $('.product-price').text('Precio: ' + producto.precio + ' €');
            $('.description').text(producto.descripcion1);
            $('.description2').text(producto.descripcion2);
            $('.description3').text(producto.descripcion3);
            $('.stock').text('Stock disponible: ' + producto.stock + ' unidades');
        },
        error: function() {
            alert('No se pudo obtener la información del producto Avalon Nano 3.');
        }
    });
});
