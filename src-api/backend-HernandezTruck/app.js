require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var alquilerRouter = require('./routes/alquiler');
var compraRouter = require('./routes/compra');
var postRouter = require('./routes/post');
var semirremolqueRouter = require('./routes/semiremolque');
var tractoraRouter = require('./routes/tractora');
var usuarioRouter = require('./routes/usuario');
var vehiculoRouter = require('./routes/vehiculo');
var app = express();
//-------------------INICIO MONGODB ATLAS
var mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })
  .then(() => console.log('Conexion Base de Datos establecida'))
  .catch((err) => console.error(err));
var db = mongoose.connection;
//-------------------FIN MONGODB ATLAS

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuarios', usuarioRouter);
app.use('/alquiler', alquilerRouter);
app.use('/compras', compraRouter);
app.use('/posts', postRouter);
app.use('/semirremolques', semirremolqueRouter);
app.use('/tractoras', tractoraRouter);
app.use('/vehiculos', vehiculoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
