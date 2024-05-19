<?php
session_start();
include 'conexion.php';

if (!isset($_POST['id_usuario'], $_POST['id_producto'])) {
    echo json_encode(['success' => false, 'error' => 'Parámetros incompletos.']);
    exit;
}

$idUsuario = $_POST['id_usuario'];
$idProducto = $_POST['id_producto'];

$sql = "DELETE FROM carrito_de_compras WHERE id_usuario = ? AND id_producto = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ii', $idUsuario, $idProducto);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Error al eliminar el producto de la base de datos.']);
}

$stmt->close();
$conn->close();
?>
