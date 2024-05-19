<?php
session_start();
include 'conexion.php';

if (!isset($_POST['id_usuario'])) {
    echo json_encode(['error' => 'Usuario no especificado.']);
    exit;
}

$idUsuario = $_POST['id_usuario'];

$sql = "SELECT p.id_pedido, p.fecha, p.estado, t.monto
        FROM pedido p
        INNER JOIN transaccion t ON p.id_pedido = t.id_pedido
        WHERE p.id_usuario = ?
        ORDER BY p.fecha DESC";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $idUsuario);
    $stmt->execute();
    $result = $stmt->get_result();

    $pedidos = [];
    while ($pedido = $result->fetch_assoc()) {
        $pedido['fecha'] = date('d/m/Y', strtotime($pedido['fecha'])); 
        $pedidos[] = $pedido;
    }

echo json_encode($pedidos);

$stmt->close();
$conn->close();
?>
