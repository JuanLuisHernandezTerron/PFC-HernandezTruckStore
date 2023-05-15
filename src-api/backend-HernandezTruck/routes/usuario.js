var express = require('express');
var router = express.Router();
const validationToken = require('./../middleware/ValidacionToken')

const { newUser, getAllUsers, loginUser, getinfoUser, ingresarPostFavorito,eliminarPostFavorito, updateUser, updatePasswd } = require('./../controllers/UsersController')

/*POST - Ingreso del usuario */
router.post('/register', newUser);

/*PUT - Modificacion del Usuario */
router.put('/updateUser',updateUser);

/*POST - Login del usuario */
router.post('/login',validationToken, loginUser)

/*GET - Información de todos los usuarios */
router.get('/getAllUsers',validationToken,getAllUsers),

/*PUT - Ingreso de Post Favorito Usuario*/
router.put('/insertPostFavorito/:idPost/:idUser',ingresarPostFavorito)

/*PUT - Eliminacion de Post Favorito Usuario*/
router.put('/eliminarPostFavorito/:idPost/:idUser',eliminarPostFavorito)

/*PUT - ACTUALIZACION DE PASSWD */
router.put('/updatePasswd',updatePasswd)

/*GET - Informacion del usuario*/
router.get('/getInfoUser/:id',validationToken,getinfoUser)

module.exports = router;