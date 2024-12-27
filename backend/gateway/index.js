const express = require('express');
const app = express();
const port = 3000;

// Definimos el middleware para analizar JSON
app.use(express.json());

// Definimos las rutas para los microservicios
app.use('/main', require('./routes/main'));
app.use('/nutrition', require('./routes/nutrition'));

// Ruta raíz
app.get('/', (req, res) => {
    res.send('API Gateway de MyCookingHub funcionando')
});

// Iniciamos el servidor
app.listen(port, () => {
    console.log(`API Gateway corriendo en http://localhost:${port}`);
});