-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-04-2024 a las 16:36:39
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `frontminers`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito_de_compras`
--

CREATE TABLE `carrito_de_compras` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id_pedido` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `estado` varchar(50) DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion1` text DEFAULT NULL,
  `descripcion2` text DEFAULT NULL,
  `descripcion3` text DEFAULT NULL,
  `descripcion4` text DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id_producto`, `nombre`, `descripcion1`, `descripcion2`, `descripcion3`, `descripcion4`, `precio`, `stock`) VALUES
(1, 'NerdMiner', 'Nerdminer es un emocionante proyecto en el mundo de la minería de Bitcoin. Desarrollado por un ingeniero conocido como Skot, representa un movimiento hacia la democratización de la minería, haciéndola accesible para entusiastas y aficionados. Vamos a explorar más sobre Nerdminer:', 'Este es un proyecto gratuito y de código abierto que te permite intentar alcanzar un bloque de Bitcoin con un pequeño dispositivo. El objetivo principal de este proyecto es que aprendas más sobre la minería y tengas una hermosa pieza de hardware en tu escritorio. El proyecto original se encuentra en el siguiente enlace:', 'Nerdminer utiliza el chip ESP32 para implementar el protocolo Stratum y minar en un pool en solitario. Originalmente funcionaba con public-pool.io (donde los Nerdminers son compatibles), pero ahora también es compatible con otras placas. Utiliza WifiManager para modificar la configuración del minero y guardarla en SPIFF. El NerdSoloMiner viene con varias pantallas para supervisar su funcionamiento y mostrar estadísticas de minería en red.', 'Nerdminer es compatible con varias placas, incluyendo LILYGO T-Display S3, ESP32-WROOM-32, LILYGO T-QT pro, LILYGO T-Display 1.14, LILYGO T-Display S3 AMOLED, entre otras.', 65.00, 50),
(2, 'BitAxe', 'BitAxe es un emocionante proyecto en el mundo de la minería de Bitcoin. Desarrollado por un ingeniero conocido como Skot, representa un movimiento hacia la democratización de la minería, haciéndola accesible para entusiastas y aficionados. Vamos a explorar más sobre BitAxe:', 'Este prototipo de minero de Bitcoin es capaz de alcanzar una impresionante tasa de hash de 0.5 terahashes por segundo (T/s). Imagina un dispositivo tan pequeño con tanta potencia.', 'Estos innovadores mineros ASIC son los primeros modelos de código abierto funcionales en el mundo. Están diseñados tanto para principiantes como para mineros experimentados, redefiniendo la eficiencia y el rendimiento en el mundo de la minería.', 'BitAxe es completamente de código abierto, con archivos de diseño de hardware disponibles. Utiliza el chip BM1366 de Bitmain. Puedes aprender a construir, programar y utilizar el bitaxeUltra, un minero independiente y versátil con WiFi y una pantalla OLED.', 128.00, 40),
(3, 'Avalon Nano 3', 'El Avalon Nano 3 es un pequeño calentador portátil que también puede generar Bitcoin. Es desarrollado y producido por Canaan Inc., una compañía listada en NASDAQ, y pertenece a la línea de productos Avalon1. Este dispositivo es ideal para resolver los problemas comunes en invierno, como el té que se enfría rápidamente o las manos y pies fríos mientras se está frente al ordenador. Además, es una forma única de obtener un ambiente cálido y al mismo tiempo generar ingresos continuos en Bitcoin.', 'El Avalon Nano 3 puede configurarse para minar utilizando 140W, 100W o 65W de potencia y es compatible con modelos de PSU de 65W, 100W y 140W1. Por favor, ten en cuenta que una PSU de 100W solo admite la minería a 100W o 65W, y una PSU de 65W solo admite la minería a 65W. El suministro de energía incluido en el “paquete completo” es una fuente de alimentación de 140W.', 'El Avalon Nano 3 está disponible en cinco colores: negro, blanco, amarillo brillante, azul medianoche y melocotón1. Después de seleccionar las ventajas, hay una opción para elegir el color1. Este dispositivo no solo es funcional y divertido, sino que también tiene un diseño minimalista y es más práctico que nunca.', '', 99.00, 60),
(4, 'Apollo II FutureBit', 'El Apollo II de FutureBit es un dispositivo de minería personal que representa casi una década de trabajo en FutureBit. Está diseñado para empoderar al individuo con un conjunto completo de herramientas de Bitcoin en un paquete fácil de usar que cualquiera puede ejecutar en su hogar. El Apollo II es un bloque de aluminio y silicio de seis pulgadas diseñado para producir bloques de Bitcoin libres y no censurables. Cuenta con un ASIC moderno de 5nm con una potencia de hash de hasta 10TH/s y una eficiencia tan baja como 28 W/TH.', 'Además, el Apollo II tiene una versión de nodo completo que puede usarse como un escritorio Linux personal con un potente procesador ARM y hasta 2TB de NVMe súper rápido, lo que permite tener toda la cadena de bloques de Bitcoin al alcance de la mano. También incluye una fuente de alimentación integrada de 450 vatios, lo que facilita su uso sin tener que lidiar con fuentes de alimentación de terceros o cables de alimentación de 6 pines.', 'El diseño térmico de nivel superior y la carcasa de aluminio están diseñados con tomas de aire innovadoras que enfrían pasivamente los componentes secundarios sin necesidad de múltiples ventiladores. El Apollo II está hecho para el usuario doméstico, con operación de 120v en EE. UU. o 220v en todo el mundo, y es súper silencioso.', NULL, 400.00, 30);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transaccion`
--

CREATE TABLE `transaccion` (
  `id_transaccion` int(11) NOT NULL,
  `id_pedido` int(11) DEFAULT NULL,
  `monto` decimal(10,2) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `estado` varchar(50) DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `correo_electronico` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `rol` enum('admin','normal') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `correo_electronico`, `contrasena`, `direccion`, `rol`) VALUES
(1, 'Administrador', 'admin@correo.com', '123456', '', 'admin'),
(2, 'User 1', 'user1@correo.com', '123456', 'C/ Travessera Carmen, 7, 3º F', 'normal');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito_de_compras`
--
ALTER TABLE `carrito_de_compras`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`) USING BTREE,
  ADD KEY `id_producto` (`id_producto`) USING BTREE;

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`);

--
-- Indices de la tabla `transaccion`
--
ALTER TABLE `transaccion`
  ADD PRIMARY KEY (`id_transaccion`),
  ADD KEY `id_pedido` (`id_pedido`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito_de_compras`
--
ALTER TABLE `carrito_de_compras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `transaccion`
--
ALTER TABLE `transaccion`
  MODIFY `id_transaccion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `transaccion`
--
ALTER TABLE `transaccion`
  ADD CONSTRAINT `transaccion_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
