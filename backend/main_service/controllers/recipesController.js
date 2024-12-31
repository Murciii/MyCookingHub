const mysql2 = require('mysql2/promise')
const dbConfig = require('../db');

// Creamos una nueva receta
exports.createRecipe = async (req, res) => {
    const { user_id, nombre_receta, descripcion, tiempo_preparacion, comensales } = req.body;

    try {
        const connection = await mysql2.createConnection(dbConfig);
        await connection.execute(
            'INSERT INTO recetas (user_id, nombre_receta, descripcion, tiempo_preparacion, comensales) VALUES (?, ?, ?, ?, ?)',
            [user_id, nombre_receta, descripcion, tiempo_preparacion, comensales]
        );
        await connection.end();

        res.status(201).json({ message: 'Receta creada exitosamente' });
    } catch (err) {
        res.status(500).json({ message: 'Error al crear la receta', error: err.message });
    }
};

// Obtenemos todas las recetas
exports.getRecipes = async (req, res) => {
    try {
        const connection = await mysql2.createConnection(dbConfig);
        const [recipes] = await connection.execute('SELECT * FROM recetas');
        await connection.end();

        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener las recetas', error: err.message });
    }
};

// Obtenemos recetas por usuario
exports.getRecipeByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const connection = await mysql2.createConnection(dbConfig);
        const [recipes] = await connection.execute('SELECT * FROM recetas WHERE user_id = ?', [userId]);
        await connection.end();

        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener las recetas del usuario', error: err.message });
    }
};

exports.deleteRecipe = async (req, res) => {
    const { id } = req.params; // Obtener el ID de la receta desde los parámetros de la URL

    try {
        const connection = await mysql2.createConnection(dbConfig);

        // Verificar si la receta existe
        const [recipe] = await connection.execute('SELECT * FROM recetas WHERE receta_id = ?', [id]);
        if (recipe.length === 0) {
            await connection.end();
            return res.status(404).json({ message: 'Receta no encontrada' });
        }

        // Eliminar la receta
        await connection.execute('DELETE FROM recetas WHERE receta_id = ?', [id]);
        await connection.end();

        res.status(200).json({ message: 'Receta eliminada correctamente' });
    } catch (err) {
        console.error('Error al eliminar receta:', err.message);
        res.status(500).json({ message: 'Error al eliminar receta', error: err.message });
    }
};
