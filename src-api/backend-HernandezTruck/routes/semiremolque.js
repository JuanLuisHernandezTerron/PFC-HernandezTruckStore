var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
const validationToken = require('./../middleware/ValidacionToken')
const { getAllRemolque } = require('./../controllers/SemiRemolque')

/* Recojo cuantos remolques hay insertardas en la Base de Datos */
router.get('/allRemolqueCount', getAllRemolque);

module.exports = router;