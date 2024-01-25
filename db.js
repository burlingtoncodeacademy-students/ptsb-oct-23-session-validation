const mongoose = require("mongoose")
const DB_URL = "mongodb://127.0.0.1:27017/sessionValidation"

const dbConnect = async () => {
    try {
        mongoose.set("strictQuery", true)
        await mongoose.connect(DB_URL)
        console.log(`[db] connected to: ${DB_URL}`)
    } catch(err) {
        console.log(`[db] error: ${err}`)
    }
}

module.exports = { dbConnect, mongoose }