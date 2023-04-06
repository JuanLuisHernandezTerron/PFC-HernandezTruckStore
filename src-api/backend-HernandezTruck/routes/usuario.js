var express = require('express');
var router = express.Router();
const validationToken = require('./../middleware/ValidacionToken')

const { newUser, getAllUsers, loginUser } = require('./../controllers/UsersController')

/*POST - Ingreso del usuario */
router.post('/register', newUser);

/*POST - Login del usuario */
router.post('/login', loginUser)

/*GET - Información de todos los usuarios */
router.get('/getAllUsers',validationToken,getAllUsers),


module.exports = router;