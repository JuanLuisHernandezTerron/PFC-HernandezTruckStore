const Usuario = require('../models/Usuario')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer')
const SALT_WORK_FACTOR = 10;

const envioCorreoOlvidatePasswd = async function (req, res) {
  let config = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'hernandeztruckstore@gmail.com',
      pass: process.env.passwdAplication
    }
  })

  let chars = "abcdefghijklmnopqrstubwsyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let password = '';
  //Crea la password aleatoria
   for (i = 0; i < 7; i++) {
     password += chars.charAt(Math.floor(Math.random() * chars.length));
   }
  console.log(password);

  try {
    let email = await Usuario.find({ email: req.body.email }).exec();
    if (email.length > 0) {
      await config.sendMail({
        from: 'Area Seguridad Hernandez Truck Store',
        to: req.body.email,
        subject: 'Cambio de Contraseña',
        text: 'Tu nueva contraseña es: ' + password + '\n Se recomienda Actualizar la contraseña \n ATT: Departamento de Seguridad Hernandez Truck Store'
      })

      bcrypt.hash(password, SALT_WORK_FACTOR, async function (err, hash) {
        await Usuario.findOneAndUpdate({ email: req.body.email }, { contrasena: hash }).exec();
      })
      res.json({ status: 'Email Enviado Correctameente' })
    } else {
      res.json({ status: 'Email No Enviado Correctamente | No existe en la BD' })
    }
  } catch (err) {
    res.json({ status: 'Email No Enviado Correctamente | No existe en la BD' })
  }
}

const updateUser = async function (req, res) {
  try {
    const data = req.body;
    consulta = Usuario.findOneAndUpdate({ email: req.body.email }, data).exec();
    res.status(200).json({ status: "Usuario Actualizado Correctamente" })
  } catch (err) {
    res.status(401).json({ status: "error", error: "Usuario no registrado" })
  }
}

const updatePasswd = async function (req, res) {
  try {
    const data = req.body;
    const ConsultaUsuario = await Usuario.findOne({ "email": data.email }).exec();
    comparePassword = await bcrypt.compare(data.contrasenaAntigua, ConsultaUsuario.contrasena);
    if (ConsultaUsuario.email == data.email && comparePassword) {
      bcrypt.hash(req.body.contrasenaActual, SALT_WORK_FACTOR, async function (err, hash) {
        consulta = Usuario.findOneAndUpdate({ email: req.body.email }, { contrasena: hash }).exec();
        res.status(200).json({ status: "Password Actualizado Correctamente" })
      })
    }
  } catch (err) {
    res.status(401).json({ status: "error", error: "Password no Actualizada" })
  }
}

const eliminarPostFavorito = async function (req, res) {

  try {
    consulta = Usuario.updateOne({ _id: req.params.idUser }, { $pull: { favoritos: req.params.idPost } }).exec();
    res.status(200).json({ status: "Post EliminadoCorrectamente" })
  } catch (err) {
    res.status(401).json({ status: "error", error: "Post no ingresado" })
  }
}

const ingresarPostFavorito = async function (req, res) {
  try {
    consulta = Usuario.findByIdAndUpdate({ _id: req.params.idUser }, { $push: { favoritos: [req.params.idPost] } }).exec();
    res.status(200).json({ status: "Post AñadidoCorrectamente" })
  } catch (err) {
    res.status(401).json({ status: "error", error: "Post no ingresado" })
  }
}

const newUser = async function (req, res) {
  try {
    const data = req.body;
    const consultaEmail = await Usuario.findOne({ "email": data.email }).exec();
    console.log(consultaEmail);
    (consultaEmail === null) ?
      (await Usuario.create(data),
        ConsultaUsuario = await Usuario.findOne({ "dni": data.dni }).exec(),
        console.log(ConsultaUsuario),
        token = jwt.sign({ _id: ConsultaUsuario._id, rol: ConsultaUsuario.rol }, process.env.secret_key_jwt, { expiresIn: '1d' }),
        res.status(200).json({ status: "Ingresado Correctamente", token })
      )
      :
      res.status(401).send("Email ya existente");
  } catch (err) {
    console.log(err);
    res.status(401).json({ status: "error", error: "Usuario no registrado" })
  }
};

const loginUser = async function (req, res) {
  const { email, contrasena } = req.body;
  console.log(email + "," + contrasena);
  const ConsultaUsuario = await Usuario.findOne({ "email": email }).exec();
  console.log(ConsultaUsuario)

  if (ConsultaUsuario === null) {
    res.status(401).json({ status: "error", error: "Email incorrecto o contraseña incorrecta" })
  } else {
    comparePassword = await bcrypt.compare(contrasena, ConsultaUsuario.contrasena);
    console.log(ConsultaUsuario.contrasena + "asdasda")
    if (ConsultaUsuario.email == email && comparePassword) {
      const token = jwt.sign({ _id: ConsultaUsuario._id, rol: ConsultaUsuario.rol }, process.env.secret_key_jwt, { expiresIn: '1d' });
      res.status(200).json({ token })
    } else {
      res.status(401).json({ status: "error", error: "Email incorrecto o contraseña incorrecta" })
    }
  }
};

const getAllUsers = async function (req, res) {
  let stringQuery = req.query.rol;
  try {
    consulta = await Usuario.find({ 'rol': stringQuery }).exec()
  } catch (err) {
    console.log(err)
    res.json({ status: "error", error: "Error" })
  }

  jwt.verify(req.token, process.env.secret_key_jwt, function (error, authData) {
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
  try {
    consulta = await Usuario.findOne({ '_id': req.params.id }, { contrasena: 0 }).populate('favoritos').exec()
  } catch (err) {
    console.log(err)
    res.json({ status: "error", error: "Error" })
  }

  jwt.verify(req.token, process.env.secret_key_jwt, function (error, authData) {
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
  getinfoUser,
  ingresarPostFavorito,
  eliminarPostFavorito,
  updateUser,
  updatePasswd,
  envioCorreoOlvidatePasswd
};