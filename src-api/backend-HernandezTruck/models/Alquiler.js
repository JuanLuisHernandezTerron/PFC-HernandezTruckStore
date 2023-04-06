var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Usuario = require("../models/Usuario");
var Vehiculo = require("../models/Vehiculo")
var db = mongoose.connection;


var alquilerSchema = new Schema({
    fecha_operacion:{type: Date, default: Date.now(),required: true},
    operacionFinalizada:{type : Boolean},
    informacionCompra:[{
        idUsusarioVendedor:{type: Schema.ObjectId,ref:'Usuario'},
        idVehiculo:{type: Schema.ObjectId,ref:'Vehiculo'},
        idUsuarioAlquilado:{type: Schema.ObjectId,ref:'Usuario'}
    }]
})

module.exports = mongoose.model('Alquiler', alquilerSchema);