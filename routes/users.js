var express = require('express');
var router = express.Router();
var dbConnection = require('../db/database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  dbConnection.query('SELECT * from users', function(err, rows, fields) {
    if (!err) {
      res.send(rows);
    } else {
      res.send('Error while performing Query.');
    }
  });
});

module.exports = router;