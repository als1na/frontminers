<?php
session_start();
include 'conexion.php';

$query = "SELECT id_producto, nombre, precio FROM producto ORDER BY id_producto ASC";
$result = $conn->query($query);

$products = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = [
            'id' => $row['id_producto'],
            'name' => $row['nombre'],
            'price' => number_format($row['precio'], 2, '.', '') . ' €'
        ];
    }
}

echo json_encode($products);
$conn->close();
?>
