const statuses = require("../enums").statuses

exports.checkKey = (req, res, next) => {
    let key = req.header("app-key")
    if (key === process.env.APP_KEY) { next(); return }
    res.send(statuses.error)
}