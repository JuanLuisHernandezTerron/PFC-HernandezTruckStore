var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Usuario = require("../models/Usuario");
var Vehiculo = require("../models/Vehiculo")
var db = mongoose.connection;


var compraSchema = new Schema({
    fecha_operacion:{type: Date, default: Date.now()},
    operacionFinalizada:{type : Boolean, default:false},
    informacionCompra:[{
        idUsuarioVendedor:{type: Schema.ObjectId,ref:'Usuario'},
        idPost:{type: Schema.ObjectId,ref:'Post'},
        idUsuarioComprador:{type: Schema.ObjectId,ref:'Usuario'}
    }]
})

module.exports = mongoose.model('Compra', compraSchema);