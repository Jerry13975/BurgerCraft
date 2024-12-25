const jwt = require('jsonwebtoken');
const User = require('../model/User');
const {generateTokens} = require('../utils/generateTokens');

exports.refreshToken = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token required' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded.userId);
        
        if (!user) {
            return res.status(403).json({message: 'Invalid refresh token'});
        }

        const {accessToken, refreshToken: newRefreshToken} = generateTokens(user._id);
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000, 
            sameSite: 'strict'
        });

        res.status(200).json({ accessToken });
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Refresh token expired' });
        }
        res.status(500).json({ message: 'Server error' });
    }
}