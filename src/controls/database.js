// IMPORTS
const sqlite = require("sqlite3").verbose()
const create = require("./database/create")
const insert = require("./database/insert").insert
const select = require("./database/select")
const update = require("./database/update").update

// CONSTANTS
const databasePath = process.env.DATABASE_DIR + process.env.DATABASE_FILE
const database = new sqlite.Database(databasePath)

// SETUP
create.ifNeeded(database)

exports.add = async (record) => {
    let count = await select.count(record.id, database)
    if (count === 0) {
        await insert(record, database)
    } else {
        await update(record, database)
    }
}

exports.all = async () => {
    return await select.all(database)
}