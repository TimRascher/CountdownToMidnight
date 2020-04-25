// CONFIGURATION
require("dotenv").config()

// INCLUDES
const express = require("express")
const routes = require("./src/routes")
const middleware = require("./src/middleware")

// CONSTANTS
const port = process.env.port || 3000
const app = express()

// VARIABLES

// MIDDLEWARE

// ROUTES
app.use("/", express.static("public"))
app.get("/clocks", middleware.json, routes.all)
const statuses = require("./src/enums").statuses
const controls = require("./src/controls")
const formatters = require("./src/utilities").formatters
app.get("/categories", middleware.json, async (req, res) => {
    try {
        var values = await controls.database.categories()
        values = formatters.categories(values)
        res.send(values)
    } catch (error) {
        console.log(error)
        res.send(statuses.error)
    }
})
app.post("/clock", middleware.checkKey, express.json(), middleware.json, routes.add)

// SERVER
app.listen(port, () => { console.log("Countdown is listening on port " + port) })