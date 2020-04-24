// CONFIGURATION
require("dotenv").config()

// INCLUDES
const express = require("express")
const controls = require("./src/controls")

// CONSTANTS
const port = process.env.port || 3000
const app = express()

// VARIABLES

// MIDDLEWARE
app.use(express.json())

// ROUTES
app.get("/", (req, res) => {
    controls.database.add({name: "Test", category: "Test"})
    res.send("Hello World!")
})

// SERVER
app.listen(port, () => { console.log("Countdown is listening on port " + port) })