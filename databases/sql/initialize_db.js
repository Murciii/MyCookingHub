const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

(async () => {
    try {
        // Configuración de la conexión
        const dbConfig = {
            host: '127.0.0.1',
            user: 'root',
            password: 'root',
            multipleStatements: true,
        };

        // Conectar a MySQL
        const connection = await mysql.createConnection(dbConfig);
        console.log('Conectado a MySQL');

        // Leer el script de inicialización
        const sqlPath = path.join(__dirname, 'init.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        // Ejecutar el script SQL
        await connection.query(sql);
        console.log('Base de datos inicializada correctamente');

        await connection.end();
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error.message);
    }
})();
