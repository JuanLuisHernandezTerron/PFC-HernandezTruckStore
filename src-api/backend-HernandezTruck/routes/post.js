var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
const Post = require('../models/Post');
const MediaMiddleware = require('./../middleware/media')
const { newPost, getPostVehicle, getVehicleAlquilar, getVehicleVenta, getPost, insertUsuarioPostFavoritos, eliminarUsuarioPostFavoritos, anadirPostReport, eliminarPost, updatePost} = require('./../controllers/PostController')
const validationToken = require('./../middleware/ValidacionToken')

/*POST - Creacion de un nuevo Post*/
router.post('/newPost',validationToken,MediaMiddleware.upload,newPost);

/*GET - Devuelve todos los posts con sus respectivos usuarios y vehículos*/
router.get('/getPostsAll',getPostVehicle);

/*GET - Devuelve los post de Alquiler*/
router.get('/getVehiclesAlquiler',getVehicleAlquilar)

/*GET - Devuelve los post de Ventas*/
router.get('/getVehiclesVenta',getVehicleVenta)

/*PUT - Inserta los usuario que han dado MG a las publicaciones*/
router.put('/insertUsuarioFavoritos/:idPost/:idUser',insertUsuarioPostFavoritos)

/*PUT - Eliminar los usuario que han dado MG a las publicaciones*/
router.put('/eliminarUsuarioFavoritos/:idPost/:idUser',eliminarUsuarioPostFavoritos)

/*GET - Devuelve mediante su id el post*/
router.get('/getPost/:id',getPost)

/*DEL - Borra el Post seleccionado por el usuario */
router.delete('/eliminarPost/:tipoVehiculo/:idVehiculo/:idPost',eliminarPost)

/*PUT - Actualizacion de un Post*/
router.put('/updatePost/:idPost/:idVehiculo',validationToken,MediaMiddleware.upload,updatePost);

/*PUT - Añade al array de Reports el usuario */
router.put('/anadirPostReportado/:idPost/:idUser',anadirPostReport)



module.exports = router;