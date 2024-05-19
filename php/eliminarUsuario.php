<?php
session_start();
include 'conexion.php';

if (isset($_POST['id_usuario'])) {
    $idUsuario = $_POST['id_usuario'];
    
    $conn->begin_transaction();

    try {
        $queryTransaccion = "DELETE t FROM transaccion t JOIN pedido p ON t.id_pedido = p.id_pedido WHERE p.id_usuario = ?";
        $stmtTransaccion = $conn->prepare($queryTransaccion);
        $stmtTransaccion->bind_param("i", $idUsuario);
        $stmtTransaccion->execute();

        $queryPedido = "DELETE FROM pedido WHERE id_usuario = ?";
        $stmtPedido = $conn->prepare($queryPedido);
        $stmtPedido->bind_param("i", $idUsuario);
        $stmtPedido->execute();

        $queryUsuario = "DELETE FROM usuario WHERE id_usuario = ?";
        $stmtUsuario = $conn->prepare($queryUsuario);
        $stmtUsuario->bind_param("i", $idUsuario);
        $stmtUsuario->execute();

        if ($stmtUsuario->affected_rows > 0) {
            $conn->commit(); 
            echo json_encode(['success' => true]);
        } else {
            throw new Exception('No se pudo eliminar el usuario.');
        }
    } catch (Exception $e) {
        $conn->rollback(); 
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }

    $stmtUsuario->close();
    $stmtPedido->close();
    $stmtTransaccion->close();
} else {
    echo json_encode(['success' => false, 'error' => 'ID de usuario no proporcionado.']);
}

$conn->close();
?>
