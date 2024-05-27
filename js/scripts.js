$(document).ready(function() {
    $("#btnRegistro").click(function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        var nombre = $("#nombre").val();
        var correo = $("#correo").val();
        var contrasena = $("#contrasena").val();

        $.ajax({
            url: "php/registro.php",
            method: "POST",
            data: { nombre: nombre, correo: correo, contrasena: contrasena },
            dataType: "json", // Asegurar que la respuesta sea interpretada como JSON
            success: function(response) {
                console.log(response);
                if (response.error) {
                    alert(response.error);
                } else {
                    // Mostrar toast de éxito
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'success',
                        title: 'Se ha registrado correctamente',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer);
                            toast.addEventListener('mouseleave', Swal.resumeTimer);
                        }
                    });

                    setTimeout(function() {
                        window.location.href = "login.html";
                    }, 3000); // Esperar 3 segundos antes de redirigir
                }
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    });
});
