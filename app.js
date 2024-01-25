const express = require("express")
const app = express()
const { dbConnect } = require("./db")

const PORT = 4000
const HOST = "127.0.0.1"

const authController = require("./controllers/auth")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(authController)

app.listen(PORT, HOST, () => {
    dbConnect()
    console.log(`[server] listening on ${HOST}:${PORT}`)
})