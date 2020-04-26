exports.databaseDownloads = (req, res) => {
    res.download(process.env.DATABASE_DIR + process.env.DATABASE_FILE)
}