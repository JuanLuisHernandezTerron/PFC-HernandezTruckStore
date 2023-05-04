var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;
var Usuario = require("../models/Usuario");
var Vehiculo = require("../models/Vehiculo")

var postSchema = new Schema({
    titulo:{type: String, required:true},
    fecha_post:{type: Date, default: Date.now()},
    tipo_publicacion:{
        type: String,
        enum:["Alquilar","Vender"],
        required:true
    },
    likes:[{type: Schema.ObjectId,
            ref: 'Usuario'
    }],
    media:{type:String},
    Reports:[{
        type: Schema.ObjectId,
        ref: 'Usuario'
    }],
    informacionUser:[{
        idUsuarioVendedor:{type: Schema.ObjectId,ref:'Usuario'},
        idVehiculo:{type: String,ref:'Vehiculo'}
    }]
})

module.exports = mongoose.model('Post', postSchema);