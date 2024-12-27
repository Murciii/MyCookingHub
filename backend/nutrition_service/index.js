const express = require('express');
const app = express();
const port = 3002;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Microservicio de Nutrición');
});

app.listen(port, () => {
    console.log(`Nutrition Service corriendo en http://localhost:${port}`);
});
