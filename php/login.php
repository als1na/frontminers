<?php
session_start(); 

include 'conexion.php';

$correo = $_POST['correo'] ?? '';
$contrasena = $_POST['contrasena'] ?? '';

if (empty($correo) || empty($contrasena)) {
    echo json_encode(["error" => "Correo y contraseña requeridos."]);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM usuario WHERE correo_electronico = ? AND contrasena = ?");
$stmt->bind_param("ss", $correo, $contrasena);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    $usuario = $resultado->fetch_assoc();
    $_SESSION['nombre_usuario'] = $usuario['nombre'];

    echo json_encode([
        "idUsuario" => $usuario['id_usuario'],
        "nombreUsuario" => $usuario['nombre'],
        "rol" => $usuario['rol']
    ]);
} else {
    echo json_encode(["error" => "Credenciales incorrectas. Por favor, intenta de nuevo."]);
}

$conn->close();
?>
