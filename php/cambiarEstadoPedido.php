<?php
session_start();
include 'conexion.php';

if (!isset($_POST['id_pedido'], $_POST['estado'])) {
    echo json_encode(['success' => false, 'error' => 'Datos insuficientes para cambiar el estado.']);
    exit;
}

$idPedido = $_POST['id_pedido'];
$estadoPedido = $_POST['estado'] === 'enviado' ? 'enviado' : 'pendiente'; 
$estadoTransaccion = $estadoPedido === 'enviado' ? 'aceptada' : 'pendiente';

$conn->begin_transaction();

try {
    $updatePedido = $conn->prepare("UPDATE pedido SET estado = ? WHERE id_pedido = ?");
    $updatePedido->bind_param('si', $estadoPedido, $idPedido);
    $updatePedido->execute();
    if ($updatePedido->affected_rows == 0) {
        throw new Exception('No se pudo actualizar el estado del pedido.');
    }

    $updateTransaccion = $conn->prepare("UPDATE transaccion SET estado = ? WHERE id_pedido = ?");
    $updateTransaccion->bind_param('si', $estadoTransaccion, $idPedido);
    $updateTransaccion->execute();
    if ($updateTransaccion->affected_rows == 0) {
        throw new Exception('No se pudo actualizar el estado de la transacción.');
    }

    $conn->commit();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

$updatePedido->close();
$updateTransaccion->close();
$conn->close();
?>
