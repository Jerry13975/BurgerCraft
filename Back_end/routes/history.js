const express = require('express');
const router = express.Router();
const {historyController, getHistoryController} = require('../controllers/historyController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, historyController);
router.get('/', authMiddleware, getHistoryController);

module.exports = router;