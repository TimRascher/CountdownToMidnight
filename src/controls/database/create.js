const fileSystem = require("fs")
const queries = require("./queries")
const databaseDir = process.env.DATABASE_DIR
const databasePath = databaseDir + process.env.DATABASE_FILE
const exsists = fileSystem.existsSync(databasePath)

if (fileSystem.existsSync(databaseDir) === false) {
    fileSystem.mkdirSync(databaseDir)
}

exports.ifNeeded = (database) => {
    database.serialize(() => {
        if (exsists === false) {
            database.run(queries.create.clocksTable)
        }
    })
}