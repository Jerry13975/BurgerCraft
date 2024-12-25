const express = require('express');
const router = express.Router();
const {favoriteController, getFavoritesController, deleteFavoriteController} = require('../controllers/favoriteController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, favoriteController);
router.get('/', authMiddleware, getFavoritesController);
router.delete('/:id', authMiddleware, deleteFavoriteController);

module.exports = router;