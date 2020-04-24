const controls = require("../controls")
const statuses = require("../enums").statuses

exports.all = async (req, res) => {
    try {
        let data = await controls.database.all()
        res.send(data)
    } catch (error) {
        console.log(error)
        res.send(statuses.error)
    }
}