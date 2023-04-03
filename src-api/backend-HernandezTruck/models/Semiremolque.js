var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;
var Vehiculo = require("../models/Vehiculo");

var semiremolqueSchema = new Schema({
    _id:{        
        type: Schema.ObjectId,
        ref: 'Vehiculo',
        required: true
    },
    tipoSemiremolque:{type: Number, require:true},
    tipoEje:{type : String,require:true},
    ADR:{type : Boolean,require:true}
})

module.exports = mongoose.model('Semiremolque', semiremolqueSchema);