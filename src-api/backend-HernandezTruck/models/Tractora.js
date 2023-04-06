var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;
var Vehiculo = require("../models/Vehiculo");

var tractoraSchema = new Schema({
    _id:{        
        type: String,
        ref: 'Vehiculo',
        required: true
    },
    cv:{type: Number, require:true},
    adblue:{type : Boolean,require:true},
    numeroDepositos:{type : Number,require:true},
    kms:{type : Number,require:true},
    combustible:{type:String,require:true},
    retarder:{type : Boolean,require:true}
})



module.exports = mongoose.model('Tractora', tractoraSchema);