var express = require('express');
var router = express.Router();
var Usuario = require('../models/Usuario');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Hola");
});

module.exports = router;
