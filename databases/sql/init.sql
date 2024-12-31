CREATE DATABASE IF NOT EXISTS mycookinghub;

USE mycookinghub;

CREATE TABLE IF NOT EXISTS usuarios (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contrasenya VARCHAR(255) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS recetas (
    receta_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    nombre_receta VARCHAR(255) NOT NULL,
    descripcion TEXT,
    tiempo_preparacion INT NOT NULL COMMENT 'Tiempo en minutos',
    comensales INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES usuarios(user_id)
);

INSERT IGNORE INTO usuarios (user_id, nombre, email, contrasenya)
VALUES
    (1, 'Alfredo Guzman', 'alf_guz@gmail.com', '$2b$10$KIXn7T/7RlULk8ghZ92W0uZ1KP9KDpOd/5M9m0NL4wLHBJrsxZd6W'), -- Contraseña: "password123"
    (2, 'Kathy Mariaca', 'k.mariaca@gmail.com','$2b$10$ywJ/Nl9w2dBYum8.4T1ZzOVDQFQ6aGj/hDQV/0cWmn12CmL8Nzb/a'); -- Contraseña: "securepass!";

INSERT IGNORE INTO recetas (receta_id, user_id, nombre_receta, descripcion, tiempo_preparacion, comensales)
VALUES 
    (1, 1, 'Bacalao al Pil Pil', 'Tradicional plato vasco de bacalao con aceite y ajo', 45, 4),
    (2, 1, 'Marmitako', 'Guiso vasco de bonito con patatas y pimientos', 60, 6),
    (3, 2, 'Ceviche', 'Pescado fresco marinado en limón con ají y cebolla', 30, 4),
    (4, 2, 'Ají de Gallina', 'Guiso peruano de pollo en salsa cremosa de ají amarillo', 50, 6),
    (5, 1, 'Txuleton', 'Chuleta de vaca madurada a la parrilla', 25, 2),
    (6, 2, 'Lomo Saltado', 'Salteado de carne con verduras y patatas fritas', 35, 4);