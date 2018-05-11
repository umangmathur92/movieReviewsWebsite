var express = require('express');
var router = express.Router();
var dbConnection = require('../db/database');
const dateFormat = require('dateformat');

router.get('/:mid', function(req, res, next) {
    var midd = req.params.mid;
    var query = 'SELECT m.mid, m.name, m.rel_date, m.url, m.description, d.name AS dir_name , AVG(score) AS avg_score ' +
    'FROM movie_directs m, directors d, review_refersto_writes r ' +
    'WHERE m.did=d.did AND r.mid=m.mid AND m.mid=' + midd + ' ' +
    'GROUP BY m.mid';
    console.log(query);
    dbConnection.query(query, function(err, rows, fields) {
        if (!err) {
            //res.send(rows[0]);
            var data = rows[0];
            data.rel_date = getFormattedDateString(data.rel_date);
            res.render('moviedetails', data);
        } else {
            res.send('Error while performing Query.');
        }
    });
});

router.post('/', function(req, res, next) {
    var midd = req.body.mid;
    var query = 'SELECT * FROM review_refersto_writes where mid=' + midd;
    console.log(query);
    dbConnection.query(query, function(err, rows, fields) {
        if (!err) {
            res.send(rows);
        } else {
            res.send('Error while performing Query.');
        }
    });
});

function getFormattedDateString(inputDate) {
	return dateFormat(inputDate, 'mmmm d, yyyy');
}

module.exports = router;