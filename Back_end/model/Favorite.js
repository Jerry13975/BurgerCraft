const burgerSchema = require("./Burger");
const mongoose = require("mongoose");


const favoriteSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    burger: burgerSchema,
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;