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
app.get("/clocks/delete", middleware.checkKey, routes.deleteAll)
app.get("/clocks/:category", middleware.json, routes.byCategory)
app.get("/clock/delete/:id", middleware.checkKey, routes.deleteById)
app.get("/check", middleware.checkKey, (req, res) => {
    res.send(require("./src/enums").statuses.success)
})

// SERVER
app.listen(port, () => { console.log("Countdown is listening on port " + port) })