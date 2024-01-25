const { mongoose } = require("../db")

const User = new mongoose.Schema({
    name: {
        // Validators
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("user", User)