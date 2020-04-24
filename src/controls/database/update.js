const queries = require("./queries")
const utilities = require("../../utilities")

exports.update = (record, database) => {
    return new Promise((resolve, reject) => {
        database.serialize(() => {
            database.run(
                queries.update,
                record.name,
                record.category,
                record.value,
                record.modifiedOn,
                record.id,
                (error) => {
                    if (error) { reject(error) }
                    else { resolve() }
                })
        })
    })
}