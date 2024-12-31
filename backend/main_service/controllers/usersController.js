const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const dbConfig = require('../db');

// Clave secreta para JWT
const JWT_SECRET = 'MyCookingHub%$';

// Registro de usuarios
exports.registerUser = async (req, res) => {
    const { email, contrasenya, nombre} = req.body;

    try {
        const connection = await mysql.createConnection(dbConfig);

        // Verificamos si el usuario ya existe
        const [existingUser] = await connection.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            await connection.end();
            return res.status(400).json({ message: 'El usuario ya existe'});
        }

        // Hasheamos la contraseña
        const hashedPassword = await bcrypt.hash(contrasenya, 10);

        // Insertamos el nuevo usuario en la BBDD
        await connection.execute('INSERT INTO usuarios (nombre, email, contrasenya) VALUES (?,?,?)', [nombre, email, hashedPassword]);
        await connection.end();

        res.status(201).json({ message:'Usuario nuevo registrado correctamente' });

    } catch (err) {
        res.status(500).json({ message:'Error al registrar usuario nuevo', error: err.message });
    }
};

// Inicio de sesion
exports.loginUser = async (req, res) => {
    const { email, contrasenya } = req.body;

    try {
        const connection = await mysql.createConnection(dbConfig);

        // Buscamos al usuario por su email
        const [users] = await connection.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (users.length === 0) {
            await connection.end();
            return res.status(401),json({ message: 'Usuario no encontrado' });
        }

        const usuario = users[0]; 

        // Verificamos que la contraseña sea correcta
        const isPasswordValid = await bcrypt.compare(contrasenya, usuario.contrasenya);
        if(!isPasswordValid) {
            await connection.end();
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        
        // Genera un token JWT
        const token = jwt.sign({ user_id: usuario.user_id, email: users.email }, JWT_SECRET, { expiresIn: '24h' });
        await connection.end();

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (err) {
        res.status(500).json({ message: 'Error al iniciar sesión', error: err.message });
    }
};

// Obtencion de usuario
exports.getProfile = async (req,res) => {
    const { user_id } = req.user;

    try {
        const connection = await mysql.createConnection(dbConfig);


        // Buscamos al usuario por su ID
        const [users] = await connection.execute('SELECT user_id, nombre, email, fecha_creacion FROM usuarios WHERE user_id = ?', [user_id]);

        if (users.length === 0) {
            await connection.end();
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const user = users[0];
        await connection.end();

        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener el perfil del usuario', error: err.message})
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await mysql.createConnection(dbConfig);

        const [user] = await connection.execute('SELECT * FROM usuarios WHERE user_id = ?', [id]);
        if (user.lenght === 0) {
            await connection.end();
            return res.status(404).json({ message: 'Usuario no encontrado'});
        }

        // Eliminamos el usuario
        await connection.execute('DELETE FROM usuarios WHERE user_id = ?',[id]);
        await connection.end();

        res.status(200).json({message: 'Usuario eliminado correctamente'});
    }catch (err) {
        console.error('Error al eliminar usuario:', err.message);
        res.status(500).json({ message: 'Error al eliminar usuario', error: err.message });
    }
};