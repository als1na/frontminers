$(document).ready(function() {
    loadProductPrices();

    function loadProductPrices() {
        $.ajax({
            url: 'php/getProductPrices.php',
            type: 'GET',
            dataType: 'json',
            success: function(products) {
                if (products.length > 0) {
                    products.forEach(function(product) {
                        var productId = parseInt(product.id);
                        switch (productId) {
                            case 1:
                                $('.product-price').filter(':eq(0)').text(product.price);
                                break;
                            case 2:
                                $('.product-price').filter(':eq(1)').text(product.price);
                                break;
                            case 3:
                                $('.product-price').filter(':eq(2)').text(product.price);
                                break;
                            case 4:
                                $('.product-price').filter(':eq(3)').text(product.price);
                                break;
                        }
                    });
                }
            },
            error: function(xhr, status, error) {
                console.error("Error al cargar precios: " + error);
            }
        });
    }
});
