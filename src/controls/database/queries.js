exports.create = Object.freeze({
    clocksTable: `
        CREATE TABLE Clocks (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            modifiedOn REAL NOT NULL
        )
    `
})
exports.insert = "INSERT INTO Clocks (id, name, category, modifiedOn) VALUES (?, ?, ?, ?)"
exports.select = Object.freeze({
    idCount: `
        SELECT
            COUNT(id) AS count
        FROM
            Clocks
        WHERE
            id = ?
    `,
    all: `
        SELECT
            id, name, category, modifiedOn
        FROM
            Clocks
    `
})
exports.update = `
    UPDATE
        Clocks
    SET
        name = ?,
        category = ?,
        modifiedOn = ?
    WHERE
        id = ?
`