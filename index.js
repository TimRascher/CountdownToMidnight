// CONFIGURATION
require("dotenv").config()

// INCLUDES
const express = require("express")
const controls = require("./src/controls")
const models = require("./src/models")

// CONSTANTS
const port = process.env.port || 3000
const app = express()

// VARIABLES

// MIDDLEWARE
app.use(express.json())

// ROUTES
app.get("/", async (req, res) => {
    try {
        await controls.database.add(new models.clock("Class Clock", "Class Category"))
    } catch (error) {
        console.log(error)
    }
    res.send("Hello World")
})
app.get("/clocks", async (req, res) => {
    res.header("content-type", "application/json")
    res.send(await controls.database.all())
})

// SERVER
app.listen(port, () => { console.log("Countdown is listening on port " + port) })