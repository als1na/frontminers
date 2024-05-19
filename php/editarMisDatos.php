<?php
session_start();
include 'conexion.php';

$idUsuario = isset($_REQUEST['id_usuario']) ? $_REQUEST['id_usuario'] : null;

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if ($idUsuario !== null) {
        $query = $conn->prepare("SELECT nombre, correo_electronico, contrasena, direccion FROM usuario WHERE id_usuario = ?");
        $query->bind_param("i", $idUsuario);
        $query->execute();
        $result = $query->get_result()->fetch_assoc();
        echo json_encode($result);
        $query->close();
    } else {
        echo json_encode(['success' => false, 'error' => 'No se proporcionó el ID de usuario']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nombre = isset($_POST['nombre']) ? $_POST['nombre'] : '';
    $correo = isset($_POST['correo']) ? $_POST['correo'] : '';
    $contrasena = isset($_POST['contrasena']) ? $_POST['contrasena'] : '';  
    $direccion = isset($_POST['direccion']) ? $_POST['direccion'] : '';  

    if ($idUsuario !== null) {
        $updateSql = "UPDATE usuario SET nombre = ?, correo_electronico = ?, direccion = ?";
        $types = 'sss'; 
        $params = [$nombre, $correo, $direccion];
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
    } else {
        echo json_encode(['success' => false, 'error' => 'No se proporcionó el ID de usuario']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Método de solicitud no válido']);
}
$conn->close();
?>
