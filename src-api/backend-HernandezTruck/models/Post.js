var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;
var Usuario = require("../models/Usuario");
var Vehiculo = require("../models/Vehiculo")

var postSchema = new Schema({
    fecha_post:{type: Date, default: Date.now()},
    tipo_publicacion:{
        type: String,
        enum:["Alquilar","Vender"],
        required:true
    },
    Reports:[{
        type: Schema.ObjectId,
        ref: 'Usuario'
    }],
    informacionUser:[{
        idUsusarioVendedor:{type: Schema.ObjectId,ref:'Usuario'},
        idVehiculo:{type: Schema.ObjectId,ref:'Vehiculo'}
    }]
})

module.exports = mongoose.model('Post', postSchema);