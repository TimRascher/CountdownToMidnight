const controls = require("../controls")
const statuses = require("../enums").statuses
const formatters = require("../utilities").formatters

exports.all = async (req, res) => {
    try {
        var clocks = await controls.database.all()
        clocks = formatters.clocks(clocks)
        res.send(clocks)
    } catch (error) {
        console.log(error)
        res.send(statuses.error)
    }
}