const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxlength: [30, "Your name can not exceed 30 characters"],
        validate: [validator.default.contains],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.default.isEmail, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
userSchema;
module.exports = mongoose.model("User", userSchema);
