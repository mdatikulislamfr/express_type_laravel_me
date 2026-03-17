const knex = require("knex");
const env = require("dotenv");
env.config();
const path = require('path')
const { DB_DATABASE, DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;
const config = {
    client: "mysql2",
    connection: {
        host: DB_HOST,
        database: DB_DATABASE,
        user: DB_USERNAME,
        password: DB_PASSWORD
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        directory: path.join(__dirname, "../", "database", "migrations"),
        tableName: 'knex_migrations'
    }
}
const database = knex(config)
module.exports = { config, database };