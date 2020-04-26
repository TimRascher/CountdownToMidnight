// CONFIGURATION
require("dotenv").config()

// INCLUDES
const express = require("express")
const routes = require("./src/routes")
const middleware = require("./src/middleware")

// CONSTANTS
const port = process.env.port || 3000
const app = express()

// ROUTES
app.use("/", express.static("public"))
app.get("/clocks", middleware.json, routes.all)
app.get("/categories", middleware.json, routes.categories)
app.post("/clock", middleware.checkKey, express.json(), middleware.json, routes.add)
app.get("/database", middleware.checkKey, routes.databaseDownloads)

const statuses = require("./src/enums").statuses
const controls = require("./src/controls")
app.get("/clocks/delete", middleware.checkKey, async (req, res) => {
    try {
        await controls.database.delete.all()
        res.send(statuses.success)
    } catch (error) {
        console.log(error)
        res.send(statuses.error)
    }
})
app.get("/clocks/:category", middleware.json, routes.byCategory)
app.get("/clock/delete/:id", middleware.checkKey, async (req, res) => {
    console.log(req.params)
})

// SERVER
app.listen(port, () => { console.log("Countdown is listening on port " + port) })