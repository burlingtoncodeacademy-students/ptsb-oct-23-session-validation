const router = require("express").Router()
const User = require("../models/Users")
const bcrypt = require("bcrypt")
const SALT = 10
const jwt = require("jsonwebtoken")
const JWT_KEY = process.env.JWT_KEY

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) throw new Error("Incomplete Data")

        // Instantiate a new model using provided req.body object values
        // Hash pwd using .hashSync() with req.body.pwd and SALT value
        // Assign pwd property to the value of .hashSync() return
        const newUser = new User({ name, email, password: bcrypt.hashSync(password, SALT)})
        await newUser.save()

        // Generate new JWT token
        const token = jwt.sign(
            // payload
            { _id: newUser._id },
            // secret key
            JWT_KEY,
            // options (24 hrs expiration)
            { expiresIn: 60 * 60 * 24 }
        )

        res.status(201).json({
            message: "User created",
            newUser,
            token
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

router.post("/login", async (req, res) => {
    try {
        // const { email, password } = req.body
        // is same as below
        const email = req.body.email
        const password = req.body.password

        if (!email || !password) throw new Error("Please provide email and password")

        // ! SPICEY MODE HOMEWORK - How would you rewrite this code to tell a user "incorrect usr or pwd instead of one or the other"
        
        const foundUser = await User.findOne({ email })
        // const foundUser = await User.find({ email })
        // if (foundUser.length === 0) console.log("user doesn't exist")
        if (!foundUser) throw new Error("User does not exist")
        
        // Async .compare() method which takes pwd from req.body
        // Compares it against pwd from the user found in the db
        const verifyPwd = await bcrypt.compare(password, foundUser.password)
        
        if (!verifyPwd) throw new Error("Incorrect Password")

        const token = jwt.sign(
            { _id: foundUser._id },
            JWT_KEY,
            { expiresIn: 60 * 60 * 24 }
        )

        res.status(200).json({
            message: "User logged in",
            token
        })

    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

module.exports = router