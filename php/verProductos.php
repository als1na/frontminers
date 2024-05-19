<?php
session_start();
require 'conexion.php';  

$query = "SELECT id_producto, nombre, descripcion1, descripcion2, descripcion3, descripcion4, precio, stock FROM producto ORDER BY id_producto ASC";
$result = $conn->query($query);
$productos = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $productos[] = [
            'id_producto' => $row['id_producto'],
            'nombre' => $row['nombre'],
            'descripcion1' => $row['descripcion1'],
            'descripcion2' => $row['descripcion2'],
            'descripcion3' => $row['descripcion3'],
            'descripcion4' => $row['descripcion4'],
            'precio' => $row['precio'],
            'stock' => $row['stock']
        ];
    }
}

echo json_encode($productos);

$conn->close();
?>
