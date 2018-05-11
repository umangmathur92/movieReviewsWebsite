var mysql = require('mysql');
var connection = mysql.createPool({
    connectionLimit : 10,
    host     : 'us-cdbr-iron-east-04.cleardb.net',
    user     : 'b1446f498d5620',
    password : 'a732509f',
    database : 'heroku_d72070cd6eb1e68'
});

module.exports = connection;
