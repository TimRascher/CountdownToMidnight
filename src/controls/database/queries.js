exports.create = Object.freeze({
    clocksTable: `
        CREATE TABLE Clocks (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            value INT NOT NULL,
            modifiedOn REAL NOT NULL
        )
    `
})
exports.insert = "INSERT INTO Clocks (id, name, category, value, modifiedOn) VALUES (?, ?, ?, ?, ?)"
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
            id, name, category, value, modifiedOn
        FROM
            Clocks
    `,
    categories: `
        SELECT DISTINCT
            category
        FROM
            Clocks
    `,
    allByCategory: `
        SELECT
            id, name, value, modifiedOn
        FROM
            Clocks
        WHERE
            category = ?
    `
})
exports.update = `
    UPDATE
        Clocks
    SET
        name = ?,
        category = ?,
        value = ?,
        modifiedOn = ?
    WHERE
        id = ?
`