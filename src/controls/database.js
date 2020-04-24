// IMPORTS
const sqlite = require("sqlite3").verbose()
const create = require("./database/create")
const queries = require("./database/querties")
const UUID = require("uuid").v4

// CONSTANTS
const databaseDir = process.env.DATABASE_DIR
const databasePath = databaseDir + process.env.DATABASE_FILE
const database = new sqlite.Database(databasePath)

create.ifNeeded(database, databaseDir, databasePath)

const add = (record) => { // add qs and db and uuid
    database.serialize(() => {
        database.run(queries.insert, UUID(), record.name, record.category, Date.now().toString(), (error) => {
            throw error
        })
    })
}

exports.add = (record) => {
    add(record)
}