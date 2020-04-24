const queries = require("./queries")

exports.count = (id, database) => {
    return new Promise((resolve, reject) => {
        database.serialize(() => {
            database.all(queries.select.idCount, id, (error, rows) => {
                if (error) { reject(error); return }
                resolve(rows[0].count)
            })
        })
    })
}