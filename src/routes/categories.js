const statuses = require("../enums").statuses
const controls = require("../controls")
const formatters = require("../utilities").formatters
exports.categories = async (req, res) => {
    try {
        var values = await controls.database.categories()
        values = formatters.categories(values)
        res.send(values)
    } catch (error) {
        console.log(error)
        res.send(statuses.error)
    }
}