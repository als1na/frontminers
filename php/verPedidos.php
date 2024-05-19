<?php
session_start();
require 'conexion.php';

$query = "SELECT p.id_pedido, u.nombre, u.correo_electronico as correo, p.fecha, t.monto, p.estado
          FROM pedido p
          JOIN usuario u ON u.id_usuario = p.id_usuario
          JOIN transaccion t ON t.id_pedido = p.id_pedido
          ORDER BY p.fecha DESC";

$result = $conn->query($query);
$pedidos = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $row['fecha'] = date('d/m/Y', strtotime($row['fecha']));
        $pedidos[] = $row;
    }
    echo json_encode($pedidos);
} else {
    echo json_encode([]);
}

$conn->close();
?>
