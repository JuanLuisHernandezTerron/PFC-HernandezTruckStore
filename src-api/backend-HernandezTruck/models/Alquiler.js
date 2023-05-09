var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Usuario = require("../models/Usuario");
var Vehiculo = require("../models/Vehiculo")
var db = mongoose.connection;


var alquilerSchema = new Schema({
    fecha_operacion:{type: Date, default: Date.now(),required: true},
    operacionFinalizada:{type : Boolean},
    informacionAlquiler:[{
        idUsusarioVendedor:{type: Schema.ObjectId,ref:'Usuario'},
        idPost:{type: Schema.ObjectId,ref:'Post'},
        idUsuarioAlquilado:{type: Schema.ObjectId,ref:'Usuario'}
    }]
})

module.exports = mongoose.model('Alquiler', alquilerSchema);