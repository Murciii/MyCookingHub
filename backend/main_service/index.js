const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Microservicio principal: Usuarios y Recetas');
});

app.listen(port, () => {
    console.log(`Main Service corriendo en http://localhost:${port}`);
});
