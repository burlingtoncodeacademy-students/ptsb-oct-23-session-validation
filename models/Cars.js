const { mongoose } = require("../db")

const Cars = new mongoose.Schema({
    make: {
        type: String
    },
    model: {
        type: String
    },
    year: {
        type: Number
    }
})

module.exports = mongoose.model("cars", Cars)