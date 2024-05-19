$(document).ready(function() {
    $('#editarProductoForm').submit(function(e) {
        e.preventDefault(); 

        var formData = {
            id_producto: $('#id_producto').val(),
            nombre: $('#nombre').val(),
            descripcion1: $('#descripcion1').val(),
            descripcion2: $('#descripcion2').val(),
            descripcion3: $('#descripcion3').val(),
            descripcion4: $('#descripcion4').val(),
            precio: $('#precio').val(),
            stock: $('#stock').val()
        };

        $.ajax({
            url: 'php/editarProducto.php',
            type: 'POST',
            data: formData,
            success: function(response) {
                var res = JSON.parse(response);
                if (res.success) {
                    alert('Producto actualizado correctamente.');
                    window.location.href = 'principal_admin.html'; 
                } else {
                    alert('Error al actualizar el producto: ' + res.error);
                }
            },
            error: function() {
                alert('Error al conectar con el servidor.');
            }
        });
    });
});
