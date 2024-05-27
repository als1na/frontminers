<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'conexion.php';

$response = array();

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
            $message = "Hola " . $nombre . ",\n\nGracias por registrarte. Aquí están los detalles de tu registro:\nUsuario: " . $correo . "\nContraseña: " . $contrasena . "\n\nPor favor, no respondas a este correo.";
            $headers = "From: contacto@frontminers.alsina.me";

            if (mail($to, $subject, $message, $headers)) {
                $response['success'] = "Registro exitoso y correo de confirmación enviado.";
            } else {
                $response['error'] = "Registro exitoso, pero no se pudo enviar el correo de confirmación.";
            }
        } else {
            $response['error'] = "Error: " . $stmt->error;
        }

        $stmt->close();
    } else {
        $response['error'] = "Error: Todos los campos son obligatorios.";
    }
} else {
    $response['error'] = "Método de solicitud no válido.";
}

$conn->close();

echo json_encode($response);
?>
