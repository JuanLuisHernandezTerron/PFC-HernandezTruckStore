var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
const validationToken = require('./../middleware/ValidacionToken')
const { getAllRemolque, getinfoRemolque } = require('./../controllers/SemiRemolque')

/*GET - Recojemos la información de un vehiculo en concreto */
router.get('/informacionVehicleRemolque/:idVehicle',getinfoRemolque)

/*GET - Recojo cuantos remolques hay insertardas en la Base de Datos */
router.get('/allRemolqueCount', getAllRemolque);

module.exports = router;