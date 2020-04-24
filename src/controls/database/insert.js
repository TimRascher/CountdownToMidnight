const utilities = require("../../utilities")
const queries = require("./queries")

exports.insert = (record, database) => {
    return new Promise((resolve, reject) => {
        database.serialize(() => {
            database.run(
                queries.insert,
                record.id,
                record.name,
                record.category,
                record.modifiedOn,
                (error) => {
                    if (error) { reject(error) }
                    else { resolve() }
                })
        })
    })
}