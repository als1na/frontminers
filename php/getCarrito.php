<?php
session_start();
include 'conexion.php';

if (!isset($_POST['id_usuario'])) {
    echo json_encode(['error' => 'No se proporcionó ID de usuario']);
    exit;
}

$idUsuario = $_POST['id_usuario'];

$sql = "SELECT c.id_producto, p.nombre, p.precio, c.cantidad
        FROM carrito_de_compras c
        JOIN producto p ON p.id_producto = c.id_producto
        WHERE c.id_usuario = ?";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    error_log("Error en prepare(): " . $conn->error);
    echo json_encode(['error' => 'Error interno del servidor.']);
    exit;
}

$stmt->bind_param("i", $idUsuario);
$stmt->execute();
$result = $stmt->get_result();

$productos = [];

if ($result->num_rows > 0) {
    while ($producto = $result->fetch_assoc()) {
        $productos[] = [
            'idProducto' => $producto['id_producto'],
            'nombre' => $producto['nombre'],
            'precio' => $producto['precio'],
            'cantidad' => $producto['cantidad']
        ];
    }
    echo json_encode($productos);
} else {
    echo json_encode([]);
}

$stmt->close();
$conn->close();
?>
