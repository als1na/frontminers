<?php
session_start();

include 'conexion.php';

$response = ['success' => false];

$id_usuario = $_POST['id_usuario'] ?? null;
$id_producto = $_POST['id_producto'] ?? null;
$cantidad = $_POST['cantidad'] ?? null;

if (!$id_usuario || !$id_producto || !$cantidad) {
    $response['error'] = 'Faltan datos necesarios para añadir al carrito.';
    echo json_encode($response);
    exit();
}

$query = "SELECT id FROM carrito_de_compras WHERE id_usuario = ? AND id_producto = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ii", $id_usuario, $id_producto);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $idCarrito = $row['id'];
    $updateQuery = "UPDATE carrito_de_compras SET cantidad = cantidad + ? WHERE id = ?";
    $updateStmt = $conn->prepare($updateQuery);
    $updateStmt->bind_param("ii", $cantidad, $idCarrito);
    if ($updateStmt->execute()) {
        $response['success'] = true;
    } else {
        $response['error'] = 'Error al actualizar la cantidad en el carrito.';
    }
    $updateStmt->close();
} else {
    $insertQuery = "INSERT INTO carrito_de_compras (id_usuario, id_producto, cantidad) VALUES (?, ?, ?)";
    $insertStmt = $conn->prepare($insertQuery);
    $insertStmt->bind_param("iii", $id_usuario, $id_producto, $cantidad);
    if ($insertStmt->execute()) {
        $response['success'] = true;
    } else {
        $response['error'] = 'Error al añadir el producto al carrito.';
    }
    $insertStmt->close();
}

$conn->close();
echo json_encode($response);
?>
