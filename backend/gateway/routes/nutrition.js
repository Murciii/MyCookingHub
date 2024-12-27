const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Redirigiendo al Nutrition Service');
});

module.exports = router;

