const bcrypt = require('bcryptjs');
const User = require('../model/User');
const {generateTokens} = require('../utils/generateTokens');


exports.loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const {accessToken, refreshToken} = generateTokens(user._id);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        
        res.status(200).json({message: 'Login successful', accessToken, refreshToken});
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
};