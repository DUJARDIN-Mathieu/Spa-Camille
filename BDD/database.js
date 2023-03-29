require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: '34.79.75.251',
    database: 'postgres',
    password: 'Codelyoko59.',
    port: 5432
});

module.exports = pool;