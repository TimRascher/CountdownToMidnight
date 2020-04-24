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
app.get("/", async (req, res) => {
    try {
        await controls.database.add({
            id: "f60887ab-3362-44cc-b810-af22df473b7a",
            name: "Test Clock 2",
            category: "Test Category",
            modifiedOn: new Date()
        })
    } catch (error) {
        console.log(error)
    }
    res.send("Hello World")
})

// SERVER
app.listen(port, () => { console.log("Countdown is listening on port " + port) })