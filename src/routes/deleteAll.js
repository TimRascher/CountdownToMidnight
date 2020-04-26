const statuses = require("../enums").statuses
const controls = require("../controls")

exports.deleteAll = async (req, res) => {
    try {
        await controls.database.delete.all()
        res.send(statuses.success)
    } catch (error) {
        console.log(error)
        res.send(statuses.error)
    }
}