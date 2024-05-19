<?php
include 'conexion.php';

$query = "SELECT * FROM producto WHERE id_producto = 2";

$result = $conn->query($query);

if ($result->num_rows > 0) {
    $producto = $result->fetch_assoc();

    echo json_encode($producto);
} else {
    echo json_encode(array("error" => "No se encontró el producto con ID 2"));
}

$conn->close();
?>
