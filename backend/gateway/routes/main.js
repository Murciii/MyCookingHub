const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Redirigiendo al Main Service');
});

module.exports = router;