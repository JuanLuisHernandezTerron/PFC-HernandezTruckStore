var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;
var Posts = require("./Post")

var usuarioSchema = new Schema({
    nombre:{type: String, required: true},
    apellidos:{type: String, required: true},
    Email:{type: String, required: true},
    contrasena:{type: String, required: true},
    rol:{
        type: String,
        enum:["registrado","administrador"],
        default: "registrado"
    },
    dni:{type: String, max:8,required: true,index:{ unique: true}},
    telefono:{type: Number, required: true},
    direccion:{type:String,required:true},
    favoritos:[{
        type: Schema.ObjectId,
        ref: 'Post'
    }]
})

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
usuarioSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword,
        this.contrasena,
        function (err,
            isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
};
