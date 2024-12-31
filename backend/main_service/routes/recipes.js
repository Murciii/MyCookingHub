const express = require('express');
const { createRecipe, getRecipes, getRecipeByUser, deleteRecipe } = require('../controllers/recipesController');

const router = express.Router();

// Rutas de recetas
router.post('/create', createRecipe);
router.get('/', getRecipes);
router.get('/user/:userId', getRecipeByUser);
router.delete('/:id', deleteRecipe);


module.exports = router;