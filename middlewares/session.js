const jwt = require("jsonwebtoken")
const Users = require("../models/Users")
const JWT_KEY = process.env.JWT_KEY

const sessionValidation = async (req, res, next) => {
    try {
        // Preflight request verifies if endpoint accepts HTTP methods
        if (req.method === "OPTIONS") next()
        // Check if token has been provided
        if (!req.headers.authorization) throw new Error("Forbidden")
        // Sanitized the token to remove the word 'Bearer' if it exists
        const authToken = req.headers.authorization.includes("Bearer")
            ? req.headers.authorization.split(" ")[1]
            : req.headers.authorization
        // Extricate payload and verify token authenticity
        const payload = authToken ? jwt.verify(authToken, JWT_KEY) : undefined
        if (!payload) throw new Error("Invalid Token")
        // Call users collection to find user matching payload id
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

module.exports = sessionValidation