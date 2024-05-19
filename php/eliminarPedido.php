<?php
session_start();
include 'conexion.php';

if (!isset($_POST['id_pedido'])) {
    echo json_encode(['success' => false, 'error' => 'No se especificó el pedido a eliminar.']);
    exit;
}

$idPedido = $_POST['id_pedido'];

$conn->begin_transaction();

try {
    $sqlTransaccion = "DELETE FROM transaccion WHERE id_pedido = ?";
    $stmtTransaccion = $conn->prepare($sqlTransaccion);
    $stmtTransaccion->bind_param('i', $idPedido);
    $stmtTransaccion->execute();

    if ($stmtTransaccion->affected_rows == 0) {
        throw new Exception('No se encontraron transacciones para eliminar, o la eliminación falló.');
    }

    $sqlPedido = "DELETE FROM pedido WHERE id_pedido = ?";
    $stmtPedido = $conn->prepare($sqlPedido);
    $stmtPedido->bind_param('i', $idPedido);
    $stmtPedido->execute();

    if ($stmtPedido->affected_rows == 0) {
        throw new Exception('No se encontró el pedido, o la eliminación falló.');
    }

    $conn->commit();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

$stmtTransaccion->close();
$stmtPedido->close();
$conn->close();
?>
