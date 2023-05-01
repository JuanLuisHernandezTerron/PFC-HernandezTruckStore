const Usuario = require('../models/Usuario')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const newUser = async function (req, res) {
  try{
    const data = req.body;
    const consultaEmail = await Usuario.findOne({"email":data.email}).exec();
    console.log(consultaEmail);
    (consultaEmail === null) ?
     (await Usuario.create(data), 
     ConsultaUsuario = await Usuario.findOne({"dni":data.dni}).exec(),
     console.log(ConsultaUsuario),
     token = jwt.sign({_id: ConsultaUsuario._id, rol:ConsultaUsuario.rol},process.env.secret_key_jwt,{expiresIn:'1d'}), 
     res.status(200).json({status:"Ingresado Correctamente",token})
     ) 
     : 
     res.status(401).send("Email ya existente");
   }catch(err){
       console.log(err);
       res.status(401).json({status:"error",error:"Usuario no registrado"})
   }
};

const loginUser = async function (req, res) {
  const {email , contrasena} = req.body;
  console.log(email+","+contrasena);
  const ConsultaUsuario = await Usuario.findOne({"email":email}).exec();
  console.log(ConsultaUsuario)
  
  if (ConsultaUsuario === null) {
    res.status(401).json({status:"error",error:"Email incorrecto o contraseña incorrecta"})
  }else{
    comparePassword = await bcrypt.compare(contrasena, ConsultaUsuario.contrasena);
    console.log(ConsultaUsuario.contrasena+"asdasda")
    if (ConsultaUsuario.email == email && comparePassword) {
      const token = jwt.sign({_id: ConsultaUsuario._id, rol:ConsultaUsuario.rol},process.env.secret_key_jwt,{expiresIn:'1d'});
      res.status(200).json({token})
    }else{
      res.status(401).json({status:"error",error:"Email incorrecto o contraseña incorrecta"})
    }
  }
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

const getinfoUser = async function (req, res) {
  try{
    consulta = await Usuario.findOne({'_id':req.params.id},{contrasena:0}).exec()
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
    loginUser,
    getinfoUser
};