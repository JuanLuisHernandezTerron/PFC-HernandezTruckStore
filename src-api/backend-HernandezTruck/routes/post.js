var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
const Post = require('../models/Post');
const { newPost } = require('./../controllers/PostController')

router.post('/newPost',newPost);

module.exports = router;