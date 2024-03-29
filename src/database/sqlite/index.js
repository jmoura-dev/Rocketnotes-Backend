const sqlite3 = require("sqlite3"); //drive for use
const sqlite = require("sqlite"); //drive for connection
const path = require("path");


async function sqliteConnection() {
    const database = await sqlite.open({
        filename: path.resolve(__dirname, "..", "database.db"),
        driver: sqlite3.Database
    })

    return database;
}

module.exports = sqliteConnection;