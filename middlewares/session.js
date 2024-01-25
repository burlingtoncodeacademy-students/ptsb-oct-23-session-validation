const jwt = require("jsonwebtoken")
const Users = require("../models/Users")
const JWT_KEY = process.env.JWT_KEY

const sessionValidation = async (req, res, next) => {
    try {
        if (req.method === "OPTIONS") next()
        if (!req.headers.authorization) throw new Error("Forbidden")
        const authToken = req.headers.authorization.includes("Bearer")
            ? req.headers.authorization.split(" ")[1]
            : req.headers.authorization
        const payload = authToken ? jwt.verify(authToken, JWT_KEY) : undefined
        if (!payload) throw new Error("Invalid Token")
        const foundUser = await Users.findOne({ _id: payload._id })
        if (!foundUser) throw new Error("User not found")
        req.user = foundUser
        next()
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
}