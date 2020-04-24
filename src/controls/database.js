// IMPORTS
const sqlite = require("sqlite3").verbose()
const queries = require("./database/querties")
const create = require("./database/create")
const insert = require("./database/insert").insert

// CONSTANTS
const databasePath = process.env.DATABASE_DIR + process.env.DATABASE_FILE
const database = new sqlite.Database(databasePath)

// SETUP
create.ifNeeded(database, queries)

exports.add = (record) => {
    insert(record, database, queries)
}