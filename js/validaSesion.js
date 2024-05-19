window.onload = function() {
    var idUsuario = sessionStorage.getItem('idUsuario');

    if (idUsuario) {
        $('a[href="login.html"]').parent().hide();
        $('a[href="registro.html"]').parent().hide();

        if (idUsuario === '1') {
            $('.cart-link, .btn-add-to-cart').addClass('force-hide');
            $('#navbarNav .navbar-nav').append(`
                <li class="nav-item">
                    <a class="nav-link" href="principal_admin.html">Administración</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" id="cerrarSesion">Cerrar sesión</a>
                </li>
            `);
        } else {
            $('#navbarNav .navbar-nav').append(`
                <li class="nav-item">
                    <a class="nav-link" href="vermispedidos.html">Ver mis pedidos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="editarmisdatos.html">Mis datos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" id="cerrarSesion">Cerrar sesión</a>
                </li>
            `);
        }

        $('#cerrarSesion').click(function(e) {
            e.preventDefault();
            sessionStorage.clear();
            window.location.href = 'index.html';
        });
    }
};
