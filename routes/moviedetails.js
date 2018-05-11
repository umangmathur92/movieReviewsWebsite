var express = require('express');
var router = express.Router();
var dbConnection = require('../db/database');

router.get('/:mid', function(req, res, next) {
    var midd = req.params.mid;
    var query = 'SELECT * from movie_directs WHERE mid='+midd;
    console.log(query);
    dbConnection.query(query, function(err, rows, fields) {
        if (!err) {
            res.send(rows);
        } else {
            res.send('Error while performing Query.');
        }
    });
});

module.exports = router;