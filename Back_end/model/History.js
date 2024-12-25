const burgerSchema = require("./Burger");
const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    burger: burgerSchema,
}, { timestamps: true });

const History = mongoose.model('History', historySchema);

module.exports = History;