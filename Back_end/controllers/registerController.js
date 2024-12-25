const bcrypt = require('bcryptjs');
const User = require('../model/User');
const {generateTokens} = require('../utils/generateTokens');

exports.registerUser = async (req, res) => {
    const {email, password} = req.body;

    const userExists = await User.findOne({email});
    if (userExists) {
        return res.status(400).json({message: 'Email already exists'});
    }

    try {
        const newUser = new User({email, password});
        await newUser.save();

        const {accessToken, refreshToken} = generateTokens(newUser._id);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        
        res.status(201).json({message: 'User registered successfully', accessToken, refreshToken});
    } catch(error) {
        res.status(500).json({message: 'Server error'});
    }
};