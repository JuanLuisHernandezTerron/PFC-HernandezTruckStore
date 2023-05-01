var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;
var Vehiculo = require("../models/Vehiculo");

var semiremolqueSchema = new Schema({
    _id:{        
        type: String,
        ref: 'Vehiculo',
        required: true
    },
    tipoSemiremolque:{type: String, require:true},
    tipoEje:{type : String,require:true},
    ADR:{type : Boolean,require:true}
})

module.exports = mongoose.model('Semiremolque', semiremolqueSchema);