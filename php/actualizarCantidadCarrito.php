<?php
session_start();
include 'conexion.php';

if (!isset($_POST['id_usuario'], $_POST['id_producto'], $_POST['cantidad'])) {
    echo json_encode(['success' => false, 'error' => 'Parámetros incompletos.']);
    exit;
}

$idUsuario = $_POST['id_usuario'];
$idProducto = $_POST['id_producto'];
$cantidad = $_POST['cantidad'];

if ($cantidad <= 0) {
    echo json_encode(['success' => false, 'error' => 'La cantidad debe ser mayor que cero.']);
    exit;
}

$sql = "UPDATE carrito_de_compras SET cantidad = ? WHERE id_usuario = ? AND id_producto = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('iii', $cantidad, $idUsuario, $idProducto);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Error al actualizar la base de datos.']);
}

$stmt->close();
$conn->close();
?>
