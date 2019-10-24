require('dotenv').config();

const pgp = require('pg-promise')({
    query: (e) => console.log(e.query)
});

const options = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
};

const db = pgp(options);

console.log('>>>>> Database connection successful >>>>>>>>>> ');

module.exports = db;