exports.insert = (record, database, queries) => {
    database.serialize(() => {
        database.run(queries.insert, record.id, record.name, record.category, record.modifiedOn, (error) => {
            throw error
        })
    })
}