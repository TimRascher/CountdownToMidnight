// IMPORTS
const sqlite = require("sqlite3").verbose()
const create = require("./database/create")
const insert = require("./database/insert").insert
const select = require("./database/select")
const update = require("./database/update").update
const dbDelete = require("./database/delete").delete

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
exports.categories = async () => {
    return await select.catigories(database)
}
exports.byCategory = async (category) => {
    return await select.byCategory(database, category)
}
exports.delete = {
    all: async () => {
        await dbDelete.all(database)
    },
    byId: async (id) => {
        await dbDelete.byId(id, database)
    }
}