require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    query: {
        "unix_sock": "/cloudsql/{}/.s.PGSQL.5432".format(process.env.CLOUD_SQL_CONNECTION_NAME)
    },
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});

module.exports = pool;