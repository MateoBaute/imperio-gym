-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-04-2026 a las 02:32:03
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `imperio-gym`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `idCompra` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ejercicios`
--

CREATE TABLE `ejercicios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `descripcion` varchar(450) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ejercicios`
--

INSERT INTO `ejercicios` (`id`, `nombre`, `descripcion`) VALUES
(1, 'Sentadilla con barra', 'Ejercicio compuesto para pierna y glúteo'),
(2, 'Press de Banca', 'Empuje horizontal para pecho y tríceps'),
(3, 'Peso Muerto', 'Ejercicio de tracción para cadena posterior'),
(4, 'Press Militar', 'Empuje vertical para hombros'),
(5, 'Remo con barra', 'Tracción horizontal para espalda'),
(6, 'Dominadas', 'Tracción vertical para espalda y bíceps'),
(7, 'Zancadas', 'Ejercicio unilateral para piernas'),
(8, 'Plancha Abdominal', 'Isométrico para el core'),
(9, 'Vuelos Laterales', 'Ejercicio para deltoide medio'),
(10, 'Press Frances', '.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `price` int(11) NOT NULL,
  `description` varchar(200) NOT NULL,
  `img` blob NOT NULL,
  `size` varchar(45) NOT NULL,
  `color` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `name`, `price`, `description`, `img`, `size`, `color`) VALUES
(55, 'Jean Slim Fit', 8500, 'Pantalón de jean con corte moderno y elástico.', 0x6a65616e5f736c696d5f6669745f63656c657374652e6a7067, 'S, M', 'Celeste'),
(56, 'Zapatillas Urbanas', 12000, 'Calzado cómodo para uso diario con suela antideslizante.', 0x7a61706174696c6c61735f757262616e61735f626c616e636f2e6a7067, 'L', 'Blanco'),
(57, 'Buzo Hoodie', 9500, 'Buzo con capucha y bolsillo canguro de frisa invisible.', 0x62757a6f5f686f6f6469655f617a756c5f6d6172696e6f2e6a7067, 'S', 'Azul Marino'),
(58, 'Camisa de Lino', 7200, 'Camisa ligera ideal para el verano.', 0x63616d6973615f64655f6c696e6f5f626c616e636f2e6a7067, 'L', 'Blanco'),
(59, 'Chaqueta Denim', 11000, 'Chaqueta clásica de jean con botones metálicos.', 0x63686171756574615f64656e696d5f617a756c5f6f736375726f2e6a7067, 'S', 'Azul Oscuro'),
(60, 'Gorra Trucker', 1800, 'Gorra con red trasera y ajuste regulable.', 0x676f7272615f747275636b65725f726f6a6f2e6a7067, 'S', 'Rojo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutinas`
--

CREATE TABLE `rutinas` (
  `id` int(11) NOT NULL,
  `nombre_rutina` varchar(45) NOT NULL,
  `nivel` varchar(45) NOT NULL,
  `creador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rutinas`
--

INSERT INTO `rutinas` (`id`, `nombre_rutina`, `nivel`, `creador`) VALUES
(21, 'Full Body', 'Intermedio', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutina_detalle`
--

CREATE TABLE `rutina_detalle` (
  `id` int(11) NOT NULL,
  `rutina_id` int(11) NOT NULL,
  `ejercicio_id` int(11) NOT NULL,
  `series` int(11) NOT NULL,
  `repeticiones` int(11) NOT NULL,
  `orden` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rutina_detalle`
--

INSERT INTO `rutina_detalle` (`id`, `rutina_id`, `ejercicio_id`, `series`, `repeticiones`, `orden`) VALUES
(118, 14, 1, 3, 12, NULL),
(160, 21, 6, 3, 15, NULL),
(161, 21, 1, 3, 15, NULL),
(162, 21, 5, 3, 15, NULL),
(163, 21, 9, 3, 15, NULL),
(164, 21, 4, 3, 15, NULL),
(165, 21, 8, 3, 15, NULL),
(166, 21, 3, 3, 15, NULL),
(167, 21, 7, 3, 15, NULL),
(168, 21, 2, 3, 15, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `admin` text DEFAULT 'false'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `email`, `admin`) VALUES
(1, 'mateo', 'DeLeon.1008', 'mateobaute10@gmail.com', 'true'),
(2, 'Dylan', 'dylancitoflow', 'dylan123@gmail.com', NULL),
(3, 'Mateo Baute', 'Mateo123', 'Fabianpalito@gmail.com', 'false'),
(4, 'Dylan123', 'dylan123', 'wtdylanlorenz@gmail.com', 'false'),
(5, 'Mateo Baute', 'Mateobaute08*', 'mateobaute10@gmail.com', 'false');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_rutina`
--

CREATE TABLE `usuario_rutina` (
  `usuario_id` int(11) NOT NULL,
  `rutina_id` int(11) NOT NULL,
  `fecha_seleccion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`idCompra`);

--
-- Indices de la tabla `ejercicios`
--
ALTER TABLE `ejercicios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `rutinas`
--
ALTER TABLE `rutinas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `rutina_detalle`
--
ALTER TABLE `rutina_detalle`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario_rutina`
--
ALTER TABLE `usuario_rutina`
  ADD PRIMARY KEY (`usuario_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `idCompra` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ejercicios`
--
ALTER TABLE `ejercicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT de la tabla `rutinas`
--
ALTER TABLE `rutinas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `rutina_detalle`
--
ALTER TABLE `rutina_detalle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=191;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
