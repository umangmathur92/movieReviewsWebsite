var express = require('express');
var router = express.Router();
var dbConnection = require('../db/database');

/* GET users listing. */
router.post('/', function(req, res, next) {
    var key = req.body.search_query;
    var sortOrder = req.body.order_by;
    var year = req.body.year;
    var popularity = req.body.rating;
    popularity = (popularity===undefined) ? 1 : popularity;
    key = (key===undefined) ? '' : key;
    sortOrder = (sortOrder===undefined) ? 'DESC' : sortOrder;//ASC or DESC
    var term = "'" + key + "%'"
    var query = 'SELECT m.mid, m.name, m.rel_date, m.url, m.description, AVG(score) AS avg_score ' + 
    'FROM movie_directs m, review_refersto_writes r ' +
    'WHERE m.mid = r.mid AND m.name LIKE ' + term + 
    ((year===undefined) ? (' ') : (' AND year(rel_date)=' + year + ' ')) + //Append this only if year is requested
    'GROUP BY m.mid ' +
    'HAVING avg_score>=' + popularity + ' ' +
    'ORDER BY rel_date ' + sortOrder;
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