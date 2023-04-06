var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;
var Post = require("../models/Post");

var vehiculoSchema = new Schema({
    _id:{type: String, max:7, require:true},
    ejes:{type : Number,require:true},
    mma:{type : Number,require:true},
    tipoVehiculo:{type:String,require:true},
    fechaMatriculacion:{type : Date,require:true},
    Marca:{type:String,require:true},
    modelo:{type:String,require:true},
    precio:{type:Number,require:true},
    color:{type:String},
    idPost:[{
        type: Schema.ObjectId,
        ref: 'Post'
    }]
})

module.exports =  mongoose.model('Vehiculo', vehiculoSchema);;