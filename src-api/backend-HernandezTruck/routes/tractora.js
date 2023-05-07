var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
const validationToken = require('./../middleware/ValidacionToken')
const { getAllTractorasCount,getAllInfoTractoras, getInfoTractora } = require('./../controllers/TractoraController')

/*GET - Recojo todas las tractoras insertardas en la Base de Datos */
router.get('/allTractoras', getAllTractorasCount);

/*GET - Recojo la información completa de los vehiculos*/
router.get('/informacionTractora', getAllInfoTractoras)

/*GET - Recojo la información de la tractora , mediante el id del vehiculo*/
router.get('/informacionVehicleTractora/:idVehicle', getInfoTractora)

module.exports = router;