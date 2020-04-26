const statuses = require("../enums").statuses
const controls = require("../controls")
const formatters = require("../utilities").formatters

exports.byCategory = async (req, res) => {
    try {
        let category = req.params.category
        var clocks = await controls.database.byCategory(category)
        clocks = formatters.clocks(clocks)
        res.send(clocks)
    } catch (error) {
        res.send(statuses.error)
    }
}