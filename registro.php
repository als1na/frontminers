<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['nombre']) && isset($_POST['correo']) && isset($_POST['contrasena'])) {
        $nombre = $conn->real_escape_string($_POST['nombre']);
        $correo = $conn->real_escape_string($_POST['correo']);
        $contrasena = $conn->real_escape_string($_POST['contrasena']);

        $sql = "INSERT INTO usuario (nombre, correo_electronico, contrasena, rol) VALUES (?, ?, ?, 'normal')";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $nombre, $correo, $contrasena);

        if ($stmt->execute()) {
            $to = $correo;
            $subject = "Confirmación de Registro";
            $message = "Hola " . $nombre . ",\\n\\nGracias por registrarte. Aquí están los detalles de tu registro:\\nUsuario: " . $correo . "\\nContraseña: " . $contrasena . "\\n\\nPor favor, no respondas a este correo.";
            $headers = "From: contacto@frontminers.alsina.me";

            mail($to, $subject, $message, $headers);
            echo "Registro exitoso y correo de confirmación enviado.";
        } else {
            echo "Error: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Error: Todos los campos son obligatorios.";
    }
} else {
    echo "Método de solicitud no válido.";
}

$conn->close();
?>
