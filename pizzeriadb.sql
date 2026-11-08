-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 08, 2026 at 06:33 PM
-- Server version: 8.4.3
-- PHP Version: 8.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pizzeria`
--

-- --------------------------------------------------------

--
-- Table structure for table `pizzeriadb`
--

CREATE TABLE `pizzeriadb` (
  `id_pedido` int NOT NULL,
  `NombreCliente` varchar(100) NOT NULL,
  `Direccion` varchar(120) NOT NULL,
  `Telefono` varchar(20) DEFAULT NULL,
  `FechaPedido` varchar(20) DEFAULT NULL,
  `TotalPedido` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pizzeriadb`
--

INSERT INTO `pizzeriadb` (`id_pedido`, `NombreCliente`, `Direccion`, `Telefono`, `FechaPedido`, `TotalPedido`) VALUES
(1, 'Carlos Santana', 'Blvd. 5 de Mayo 123', '477123456', '2026-11-07', 350.50),
(2, 'Sofía Morales', 'Paseo de los Insurgentes 456', '477987654', '2026-07-07', 420.00),
(3, 'Mario Dominguez', 'centro #8383', '472237642', '2026-11-08', 160.00),
(4, 'Juan Castillos', 'Nuevo León', '47927317', '2026-11-08', 240.00),
(5, 'Luis Salazar', 'Caraban #4562', '4797351273', '2026-11-08', 390.00),
(6, 'Jose Perez', 'Zuka #123', '4779876543', '2026-11-07', 280.00),
(7, 'Maria Dolores', 'Perla #5628', '4792547638', '2026-12-01', 480.00),
(8, 'Karla Quintana', 'Girasoles #450', '4791086754', '2026-11-07', 530.00),
(9, 'Jack Zamora', 'Los alamos #4672', '4776438872', '2026-11-08', 390.00);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pizzeriadb`
--
ALTER TABLE `pizzeriadb`
  ADD PRIMARY KEY (`id_pedido`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pizzeriadb`
--
ALTER TABLE `pizzeriadb`
  MODIFY `id_pedido` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
