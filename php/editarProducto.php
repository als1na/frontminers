<?php
session_start();
include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['id_producto'])) {
    $id_producto = $_POST['id_producto'];
    $nombre = $_POST['nombre'];
    $descripcion1 = $_POST['descripcion1'];
    $descripcion2 = $_POST['descripcion2'];
    $descripcion3 = $_POST['descripcion3'];
    $descripcion4 = $_POST['descripcion4'];
    $precio = $_POST['precio'];
    $stock = $_POST['stock'];

    $sql = "UPDATE producto SET 
            nombre = ?, 
            descripcion1 = ?, 
            descripcion2 = ?, 
            descripcion3 = ?, 
            descripcion4 = ?, 
            precio = ?, 
            stock = ? 
            WHERE id_producto = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssdii", $nombre, $descripcion1, $descripcion2, $descripcion3, $descripcion4, $precio, $stock, $id_producto);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Datos incompletos.']);
}
?>
