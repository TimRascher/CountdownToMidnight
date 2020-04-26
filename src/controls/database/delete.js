const queries = require("./queries")
exports.delete = {
    all: (database) => {
        return new Promise((resolve, reject) => {
            database.serialize(() => {
                database.run(queries.delete.all, (error) => {
                    if (error) { reject(error) }
                    else { resolve() }
                })
            })
        })
    }
}