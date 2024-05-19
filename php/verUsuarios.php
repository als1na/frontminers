<?php
session_start();
include 'conexion.php';

$query = "SELECT id_usuario, nombre, correo_electronico as correo, direccion FROM usuario WHERE id_usuario != 1 ORDER BY id_usuario ASC";
$result = $conn->query($query);
$usuarios = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $usuarios[] = $row;
    }
    echo json_encode($usuarios);
} else {
    echo json_encode([]);
}

$conn->close();
?>
