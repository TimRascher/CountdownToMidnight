const utilities = require("../utilities")
const controls = require("../controls")
const statuses = require("../enums").statuses

exports.add = async (req, res) => {
    try {
        var validClock = utilities.validator.clock(req.body)
        if (validClock.isValid === true) {
            await controls.database.add(validClock.clock)
            res.send(statuses.success)
        } else { 
            res.send(statuses.error)
        }
    } catch (error) {
        console.log(error)
        res.send(statuses.error)
    }
}