const express = require('express');
const { registerUser, loginUser, getProfile, deleteUser } = require('../controllers/usersController');
const { authenticateToken } = require('../middleware/authMiddleware')

const router = express.Router();

//Rutas para usuarios
router.post('/register',registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateToken, getProfile);
router.delete('/:id', deleteUser);


module.exports = router;