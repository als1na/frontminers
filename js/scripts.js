$(document).ready(function() {
    $("#btnRegistro").click(function() {
        var nombre = $("#nombre").val();
        var correo = $("#correo").val();
        var contrasena = $("#contrasena").val();

        $.ajax({
            url: "php/registro.php",
            method: "POST",
            data: { nombre: nombre, correo: correo, contrasena: contrasena },
            success: function(response) {
                console.log(response);
                window.location.href = "login.html";
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    });
});
