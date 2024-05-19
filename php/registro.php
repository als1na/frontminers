<?php
include 'conexion.php';

$nombre = $conn->real_escape_string($_POST['nombre']);
$correo = $conn->real_escape_string($_POST['correo']);
$contrasena = $conn->real_escape_string($_POST['contrasena']);

$sql = "INSERT INTO Usuario (nombre, correo_electronico, contrasena, rol)
        VALUES (?, ?, ?, 'normal')";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $nombre, $correo, $contrasena);

if ($stmt->execute()) {
    $to = $correo;
    $subject = "Confirmación de Registro";
    $message = "Hola " . $nombre . ",\n\nGracias por registrarte. Aquí están los detalles de tu registro:\nUsuario: " . $correo . "\nContraseña: " . $contrasena . "\n\nPor favor, no respondas a este correo.";
    $headers = "From: registro@frontminers.com";

    mail($to, $subject, $message, $headers);
    echo "Registro exitoso y correo de confirmación enviado.";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
