<?php
// Configuración de la conexión a la base de datos
$servername = "localhost";
$username = "u100856116_admin"; 
$password = "0&pZZx0N"; 
$dbname = "u100856116_frontminers";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
