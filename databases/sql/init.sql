CREATE DATABASE mycookinghub;

USE mycookinghub;

CREATE TABLE usuarios (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    contrasenya VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE recetas (
    receta_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    nombre receta VARCHAR(255),
    descripcion TEXT,
    tiempo_preparacion INT,
    comensales INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES usuarios(user_id)
);