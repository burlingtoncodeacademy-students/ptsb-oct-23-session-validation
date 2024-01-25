const router = require("express").Router()
const Cars = require("../models/Cars")
const { route } = require("./auth")

router.post("/create", async (req, res) => {
    try {
        const { make, model, year } = req.body

        const newCar = new Cars({ make, model, year })
        await newCar.save()

        res.status(201).json({
            message: "Car created",
            newCar
        })

    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

router.get("/", async (req, res) => {
    try {
        const allCars = await Cars.find()
        
        res.status(200).json({
            ...allCars
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

module.exports = router