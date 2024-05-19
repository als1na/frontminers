<?php
include 'conexion.php';

$correo = $_POST['correo'] ?? '';

if (empty($correo)) {
    echo json_encode(["error" => "Introduce un correo electrónico válido."]);
    exit;
}

$stmt = $conn->prepare("SELECT contrasena FROM usuario WHERE correo_electronico = ?");
$stmt->bind_param("s", $correo);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    $usuario = $resultado->fetch_assoc();
    $contrasena = $usuario['contrasena'];

    $to = $correo;
    $subject = "Recuperación de contraseña";
    $message = "Usuario: " . $correo . "\nContraseña: " . $contrasena ;
    $headers = "From: recuperarpass@frontminers.com";

    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(["success" => "Correo enviado con éxito."]);
    } else {
        echo json_encode(["error" => "Error al enviar el correo."]);
    }
} else {
    echo json_encode(["error" => "No se encontró un usuario con ese correo electrónico."]);
}

$conn->close();
?>
