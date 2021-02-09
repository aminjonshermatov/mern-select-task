const mysql = require("mysql");

require("dotenv").config();

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'pass',
    database : 'restAPI',
});

module.exports = connection;