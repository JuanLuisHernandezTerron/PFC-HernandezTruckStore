// importamos passport
const passport = require('passport');
// importamos la estrategia
const LocalStrategy = require('passport-local').Strategy;
// importamos el modelo User
const User = require('../models/Usuario');

//serializamos el usuario -> Solo nos cojería el id
passport.serializeUser((user, done) => {
    done(null, user._id);
});

//deserialización de usuario -> Para que nos coja todo el objeto user tendremos que deserializar
passport.deserializeUser((id, done) => {
    User.findById(id, function(error, user){
    done(err, user);
    });
});

// definimos la estrategia de validación
    
passport.use(new LocalStrategy(
    //indicamos que campo se corresponde con el usuario
    {usernameField: 'username'},
    (username, passport, done) => {
    // Buscamos en la BBDD por usernme
    User.findOne({username}, function(error, User){
    // si no existe "no registrado"
    if(!User) {
        return done(null, false, {message: `El usuario ${username} no está registrado`});
    } else {
    // Existe. comparamos la password
        User.comparePassword(password, function(err, isMatch){
            if(isMatch) {
            // Coinciden, devuelve el usuario
                return done(null, User);
            } else {
            //error de contraseña
                return done(null, false, {message: `Contraseña no válida`});
            }
        });
        }
    });
}));

// función que nos va a ermitir restringir el acceso a ciertas rutas.
exports.isAuthenticated = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.status(401).send('Debes hacer login para acceder a este recurso');
};
    