var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hola a todos')
});

module.exports = router;