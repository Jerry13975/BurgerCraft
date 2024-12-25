const mongoose = require("mongoose");

const burgerSchema = new mongoose.Schema({
    bun: String,
    patties: [String],
    toppings: [String],
    sauces: [String],
});

module.exports = burgerSchema;