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
app.post("/clock", middleware.checkKey, express.json(), middleware.json, routes.add)

// SERVER
app.listen(port, () => { console.log("Countdown is listening on port " + port) })