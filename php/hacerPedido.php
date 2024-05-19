<?php
session_start();
include 'conexion.php';

if (!isset($_POST['id_usuario'], $_POST['total'], $_POST['correo'])) {
    echo json_encode(['success' => false, 'error' => 'Faltan datos para realizar el pedido.']);
    exit;
}

$idUsuario = $_POST['id_usuario'];
$usuarioCorreo = $_POST['correo'];
$total = (float)$_POST['total'];

$conn->begin_transaction();

try {
    $sql = "SELECT p.id_producto, p.nombre, c.cantidad, p.precio, c.cantidad * p.precio AS subtotal
            FROM carrito_de_compras c
            JOIN producto p ON p.id_producto = c.id_producto
            WHERE c.id_usuario = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $idUsuario);
    $stmt->execute();
    $result = $stmt->get_result();
    $productos = [];
    $detallePedido = "";

    while ($row = $result->fetch_assoc()) {
        $productos[] = $row;
        $detallePedido .= "Producto: " . $row['nombre'] . ", Cantidad: " . $row['cantidad'] . ", Precio unitario: " . $row['precio'] . "€, Subtotal: " . $row['subtotal'] . "€\n";
        $sqlUpdate = "UPDATE producto SET stock = stock - ? WHERE id_producto = ? AND stock >= ?";
        $updateStmt = $conn->prepare($sqlUpdate);
        $updateStmt->bind_param('iii', $row['cantidad'], $row['id_producto'], $row['cantidad']);
        $updateStmt->execute();

        if ($updateStmt->affected_rows == 0) {
            throw new Exception('No hay suficiente stock para el producto ID ' . $row['id_producto']);
        }
    }
    
    $sqlPedido = "INSERT INTO pedido (id_usuario, estado) VALUES (?, 'pendiente')";
    $stmtPedido = $conn->prepare($sqlPedido);
    $stmtPedido->bind_param('i', $idUsuario);
    $stmtPedido->execute();
    $idPedido = $conn->insert_id;

    $sqlTransaccion = "INSERT INTO transaccion (id_pedido, monto, estado) VALUES (?, ?, 'pendiente')";
    $stmtTransaccion = $conn->prepare($sqlTransaccion);
    $stmtTransaccion->bind_param('id', $idPedido, $total);
    $stmtTransaccion->execute();

    $sqlLimpiarCarrito = "DELETE FROM carrito_de_compras WHERE id_usuario = ?";
    $stmtLimpiar = $conn->prepare($sqlLimpiarCarrito);
    $stmtLimpiar->bind_param('i', $idUsuario);
    $stmtLimpiar->execute();

    $conn->commit();

    $to = "contacto@alsina.me, $usuarioCorreo"; 
    $subject = "Confirmación de Pedido";
    $message = "Gracias por tu pedido.\nDetalles del pedido:\n" . $detallePedido . "\nTotal del pedido: " . $total . "€";
    $headers = "From: compra@frontminers.com";

    mail($to, $subject, $message, $headers);  

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

$conn->close();
?>
