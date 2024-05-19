$(document).ready(function() {
    $("#loginForm").submit(function(event) {
        event.preventDefault(); 
        
        var correo = $("#correo").val();
        var contrasena = $("#contrasena").val();

        $.ajax({
            type: "POST",
            url: "php/login.php",
            data: { correo: correo, contrasena: contrasena },
            dataType: "json", 
            success: function (response) {
                console.log(response);
                if (response.error) {
                    $("#mensajeError").text(response.error);
                } else {
                    sessionStorage.setItem('idUsuario', response.idUsuario);
                    sessionStorage.setItem('nombre_usuario', response.nombreUsuario);
                    sessionStorage.setItem('correo', correo);

                    if (response.rol === 'admin') {
                        window.location.href = "principal_admin.html";
                    } else {
                        window.location.href = "productos.html";
                    }
                }
            },
            error: function(xhr, status, error) {
                console.error("Error al procesar la petición: " + error);
            }
        });
    });

    $("#forgotPassword").click(function() {
        var correo = $("#correo").val();
        if (!correo) {
            alert("Por favor, introduce tu correo electrónico para recuperar tu contraseña.");
            return;
        }

        $.ajax({
            type: "POST",
            url: "php/forgotPassword.php",
            data: { correo: correo },
            dataType: "json",
            success: function(response) {
                if (response.error) {
                    alert(response.error);
                } else {
                    alert(response.success);
                }
            },
            error: function() {
                alert("Error al procesar la petición.");
            }
        });
    });

});
