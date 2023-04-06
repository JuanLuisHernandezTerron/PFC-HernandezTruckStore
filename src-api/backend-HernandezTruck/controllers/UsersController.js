const Usuario = require('../models/Usuario')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const newUser = async function (req, res) {
  try{
    const data = req.body;
    await Usuario.create(data)
    const token = jwt.sign({_id:data._id},process.env.secret_key_jwt);
    res.status(200).json({status:"Ingresado Correctamente",token})
  
   }catch(err){
       console.log(err)
       res.json({status:"error",error:"Usuario no registrado"})
   }
};

const loginUser = async function (req, res) {
  const {email , contrasena} = req.body;
  const token = jwt.sign({email:email,contrasena:contrasena},process.env.secret_key_jwt);
  res.status(200).json({token})

};

const getAllUsers = async function (req, res) {
  let stringQuery = req.query.rol;
  try{
    consulta = await Usuario.find({'rol':stringQuery}).exec()
  }catch(err){
    console.log(err)
    res.json({status:"error",error:"Error"})
  }

  jwt.verify(req.token, process.env.secret_key_jwt , function(error, authData) {
    if (error) {
      res.sendStatus(403);
    } else {
      res.json({
      consulta
    });
  }
});
}

module.exports = {
    newUser,
    getAllUsers,
    loginUser
};