exports.json = (req, res, next) => {
    res.header("content-type", "application/json")
    next()
}