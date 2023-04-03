var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;
var Post = require("../models/Post");

var vehiculoSchema = new Schema({
    matricula:{type: String, max:7, require:true},
    ejes:{type : Number,require:true},
    mma:{type : Number,require:true},
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

module.exports = mongoose.model('Vehiculo', vehiculoSchema);