const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Todo", todoSchema);