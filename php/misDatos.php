<?php
session_start();
include 'conexion.php';

$idUsuario = 1; 

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $query = $conn->prepare("SELECT nombre, correo_electronico, contrasena FROM usuario WHERE id_usuario = ?");
    $query->bind_param("i", $idUsuario);
    $query->execute();
    $result = $query->get_result()->fetch_assoc();
    echo json_encode($result);
    $query->close();
} elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $contrasena = $_POST['contrasena'];  

    $updateSql = "UPDATE usuario SET nombre = ?, correo_electronico = ?";
    $types = 'ss'; 
    $params = [$nombre, $correo];
    if (!empty($contrasena)) {
        $updateSql .= ", contrasena = ?";
        $params[] = $contrasena;
        $types .= 's';
    }
    $updateSql .= " WHERE id_usuario = ?";
    $params[] = $idUsuario;
    $types .= 'i';

    $updateStmt = $conn->prepare($updateSql);
    $updateStmt->bind_param($types, ...$params);
    $updateStmt->execute();
    
    if ($updateStmt->errno) {
        echo json_encode(['success' => false, 'error' => 'Error en la actualización: ' . $updateStmt->error]);
    } else {
        echo json_encode(['success' => true]);
    }
    $updateStmt->close();
}
$conn->close();
?>
