const express = require('express');
const usersRoutes = require('./routes/users');
const recipesRoutes = require('./routes/recipes');
const mysql = require('mysql2/promise');
const dbConfig = require('./db');

const app = express();
const port = 3001;

// Middleware para procesar JSON
app.use(express.json());

// Conexion a la base de datos al inicar el servidor
(async () => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Conexión a la base de datos establecida.');
        await connection.end();
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
        process.exit(1); // Finaliza el proceso si no puede conectar
    }
})();

// Rutas principales
app.get('/', (req, res) => {
    res.send('Microservicio principal: Usuarios y Recetas');
});

// Rutas para usuarios
app.use('/users', usersRoutes);

// Rutas para recetas
app.use('/recipes', recipesRoutes);

app.listen(port, () => {
    console.log(`Main Service corriendo en http://localhost:${port}`);
});
