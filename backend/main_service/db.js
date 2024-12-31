const mysql = require('mysql2/promise');

// Configuramos la conexion a MySQL
const dbConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database:'mycookinghub',
};

module.exports = dbConfig;