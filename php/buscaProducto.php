<?php
session_start();
include 'conexion.php';

if (isset($_GET['id_producto'])) {
    $idProducto = $_GET['id_producto'];

    $query = $conn->prepare("SELECT id_producto, nombre, descripcion1, descripcion2, descripcion3, descripcion4, precio, stock FROM producto WHERE id_producto = ?");
    $query->bind_param("i", $idProducto);
    $query->execute();
    $result = $query->get_result();
    $producto = $result->fetch_assoc();

    if ($producto) {
        echo json_encode($producto);
    } else {
        echo json_encode(null);
    }

    $query->close();
    $conn->close();
} else {
    echo json_encode(['error' => 'No se proporcionó el ID del producto']);
}
?>
