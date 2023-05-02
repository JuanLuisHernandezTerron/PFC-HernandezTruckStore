var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
const Post = require('../models/Post');
const { newPost, getPostVehicle } = require('./../controllers/PostController')
const validationToken = require('./../middleware/ValidacionToken')
/* Creacion de un nuevo Post*/
router.post('/newPost',validationToken,newPost);

/* Devuelve todos los posts con sus respectivos usuarios y vehículos*/
router.get('/getPostsAll',getPostVehicle);



module.exports = router;