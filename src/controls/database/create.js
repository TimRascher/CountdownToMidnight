const fileSystem = require("fs")

exports.ifNeeded = (database, databaseDir, databasePath) => {
    database.serialize(() => {
        if (fileSystem.existsSync(databaseDir) === false) {
            fileSystem.mkdirSync(databaseDir)
        }
        if (fileSystem.existsSync(databasePath) === false) {
            database.run(`
                CREATE TABLE Clocks (
                    id TEXT PRIMARY KEY,
                    name TEXT NOT NULL,
                    category TEXT NOT NULL,
                    modifiedOn TEXT NOT NULL
                );
            `)
        }
    })
}