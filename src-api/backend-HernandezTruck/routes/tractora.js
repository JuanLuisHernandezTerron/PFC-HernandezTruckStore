var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
const validationToken = require('./../middleware/ValidacionToken')
const { getAllTractoras } = require('./../controllers/TractoraController')

/* Recojo todas las tractoras insertardas en la Base de Datos */
router.get('/allTractoras', getAllTractoras);

module.exports = router;