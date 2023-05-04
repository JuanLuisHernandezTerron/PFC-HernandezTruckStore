var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
const Post = require('../models/Post');
const MediaMiddleware = require('./../middleware/media')
const { newPost, getPostVehicle, getVehicleAlquilar, getVehicleVenta, getPost } = require('./../controllers/PostController')
const validationToken = require('./../middleware/ValidacionToken')
/* Creacion de un nuevo Post*/
router.post('/newPost',validationToken,MediaMiddleware.upload,newPost);

/* Devuelve todos los posts con sus respectivos usuarios y vehículos*/
router.get('/getPostsAll',getPostVehicle);

/* Devuelve los post de Alquiler*/
router.get('/getVehiclesAlquiler',getVehicleAlquilar)

/* Devuelve los post de Ventas*/
router.get('/getVehiclesVenta',getVehicleVenta)

/* Devuelve mediante su id el post*/

router.get('/getPost/:id',getPost)


module.exports = router;