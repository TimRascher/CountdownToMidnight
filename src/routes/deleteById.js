const statuses = require("../enums").statuses
const controls = require("../controls")

exports.deleteById = async (req, res) => {
    try {
        let id = req.params.id
        await controls.database.delete.byId(id)
        res.send(statuses.success)
    } catch {
        console.log(error)
        res.send(statuses.error)
    }
}