var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
const validationToken = require('./../middleware/ValidacionToken')
const { getAllTractorasCount,getAllInfoTractoras } = require('./../controllers/TractoraController')

/* Recojo todas las tractoras insertardas en la Base de Datos */
router.get('/allTractoras', getAllTractorasCount);

/* Recojo la información completa de los vehiculos*/

router.get('/informacionTractora', getAllInfoTractoras)

module.exports = router;