// require('dotenv').config();

const pgp = require('pg-promise')({
    query: (e) => console.log(e.query)
});

const options = {
    host: 'localhost',
    port: 5432,
    database: 'calculus_prep'
};

const db = pgp(options);

console.log('>>>>> Database connection successful >>>>>>>>>> ');

module.exports = db;