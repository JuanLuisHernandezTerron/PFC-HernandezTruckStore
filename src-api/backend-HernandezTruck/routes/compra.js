var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
const {agregarCompra, getinfoCompra,confirmarCompra, cancelarOperacion} = require('./../controllers/CompraController')

/*POST - AGREGAR NUEVA OPERACION */
router.post('/agregarOperacion/:idUserVendedor/:idUserComprador/:idPost/:tipoVehiculo',agregarCompra);

/*GET - RECOGER INFORMACION DE TODAS LAS OPERACIONES */
router.get('/getInformacionAllOperations', getinfoCompra);

/*DELETE - ACEPTA COMPRA Y ELIMINA LA OPERACION, POST, VEHICULO Y/O CABEZA TRACTORA*/
router.delete('/confirmarCompra/:tipoVehiculo/:idOperacion/:idVehiculo/:idPost', confirmarCompra);

/*DELET - CANCELA LA OPERACION, Y SE ELIMINA */
router.delete('/cancelarOperacion/:idOperacion', cancelarOperacion);

module.exports = router;