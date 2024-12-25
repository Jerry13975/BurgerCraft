const express = require('express');
const {registerUser} = require('../controllers/registerController');
const {loginUser} = require('../controllers/loginController');
const {refreshToken} = require('../controllers/refreshTokenController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);
router.get('/verify', authMiddleware, (req, res) => { 
    res.status(200).send("Token is valid");
});

module.exports = router;    