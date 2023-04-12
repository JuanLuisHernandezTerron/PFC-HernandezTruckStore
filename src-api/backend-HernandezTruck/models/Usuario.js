var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;
var Posts = require("./Post")

var usuarioSchema = new Schema({
    nombre:{type: String, required: true},
    apellidos:{type: String, required: true},
    email:{type: String, required: true,index:{ unique: true}},
    contrasena:{type: String, required: true},
    rol:{
        type: String,
        default: "registrado",
        enum:["registrado","administrador"]
    },
    dni:{type: String, max:8,required: true,index:{ unique: true}},
    telefono:{type: Number, required: true},
    direccion:{type:String,required:true},
    favoritos:[{
        type: Schema.ObjectId,
        ref: 'Post'
    }]
});

const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

// Contraseña
usuarioSchema.pre('save', function (next) {
    var user = this;
    // solo aplica una función hash al password si ha sido modificado (o es nuevo)
    if (!user.isModified('contrasena')) return next();
    // genera la salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        // aplica una función hash al password usando la nueva salt
        bcrypt.hash(user.contrasena, salt, function (err, hash) {
            if (err) return next(err);
            // sobrescribe el password escrito con el “hasheado”
            user.contrasena = hash;
            next();
        });
    });
});
//Comparamos las contraseñas y nos la devuelve desencriptada.
usuarioSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
    });
};
const Usuario = mongoose.model("Usuario",usuarioSchema)
module.exports = Usuario;
