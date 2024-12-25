require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const categoriesRouter = require('./routes/categories');
const favoriteRouter = require('./routes/favorite');
const historyRouter = require('./routes/history');

const app = express();
const path = require('path');

app.use(cookieParser());

app.use(express.json());

app.use('/api/categories', categoriesRouter);
app.use('/api/auth', authRouter);
app.use('/api/favorites', favoriteRouter);
app.use('/api/history', historyRouter);

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});