const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, "Please write a todo"],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("Todo", todoSchema);
