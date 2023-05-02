var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;
var Vehiculo = require("../models/Vehiculo");

var semiremolqueSchema = new Schema({
    _id:{type:String,require:true},
    tipoSemiremolque:{type: String, require:true},
    tipoEje:{type : String,require:true},
    ADR:{type : Boolean,require:true},
    vehiculo:{     
        type: String,
        ref: 'Vehiculo',
        required: true}
})

module.exports = mongoose.model('Semiremolque', semiremolqueSchema);