const Pool = require('pg').Pool

const pool = new Pool({
    user : 'postgres',
    host : 'localhost',
    database : 'quiz_users',
    password : 'nikhil',
    port : 5432
})

module.exports = pool