const Usuario = require('../models/Usuario')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const newUser = async function (req, res) {
  try{
    const data = req.body;
    const consultaEmail = await Usuario.find({"email":data.email}).exec();
    console.log(consultaEmail.length);
    (consultaEmail.length === 0) ?
     (await Usuario.create(data), 
     ConsultaUsuario = await Usuario.find({"dni":data.dni}).exec(),
     token = jwt.sign({_id: ConsultaUsuario[0]._id},process.env.secret_key_jwt,{expiresIn:'1d'}), 
     res.status(200).json({status:"Ingresado Correctamente",token})
     ) 
     : 
     res.send("Email ya existente");
   }catch(err){
       console.log(err);
       res.status(401).json({status:"error",error:"Usuario no registrado"})
   }
};

const loginUser = async function (req, res) {
  const {email , contrasena} = req.body;
  console.log(email+","+contrasena);
  const ConsultaUsuario = await Usuario.find({"email":email}).exec();
  console.log(ConsultaUsuario)
  
  if (ConsultaUsuario.length === 0) {
    res.status(401).json({status:"error",error:"Email incorrecto o contraseña incorrecta"})
  }else{
    comparePassword = await bcrypt.compare(contrasena, ConsultaUsuario[0].contrasena);
    console.log(ConsultaUsuario[0].contrasena)
    if (ConsultaUsuario[0].email == email && comparePassword) {
      const token = jwt.sign({_id: ConsultaUsuario[0]._id},process.env.secret_key_jwt,{expiresIn:'1d'});
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

module.exports = {
    newUser,
    getAllUsers,
    loginUser
};