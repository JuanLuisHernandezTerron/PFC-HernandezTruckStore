const Post = require('../models/Post');
const Vehiculo = require('../models/Vehiculo');
const cabezatractora = require('../models/Tractora');
const semiremolque = require('../models/Semiremolque')
const Usuario = require('../models/Usuario');

const anadirPostReport = async function (req,res){
  try {
    consulta = Post.updateOne({ _id: req.params.idPost }, {$addToSet:{Reports:req.params.idUser}}).exec();
    res.status(200).json({ status: "Post Reportador Correctamente" })
  } catch (err) {
    res.status(401).json({ status: "error", error: "Post no ingresado" })
  }
}

const eliminarUsuarioPostFavoritos = async function (req, res) {
  try {
    consulta = Post.updateOne({ _id: req.params.idPost }, {$pull:{likes:req.params.idUser}}).exec();
    res.status(200).json({ status: "Post Eliminado Correctamente" })
  } catch (err) {
    res.status(401).json({ status: "error", error: "Post no ingresado" })
  }
}

const insertUsuarioPostFavoritos = async function (req, res) {
  try {
    consulta = Post.updateOne({ _id: req.params.idPost }, {$push:{likes:[req.params.idUser]}}).exec();
    res.status(200).json({ status: "Post IngresadoCorrectamente" })
  } catch (err) {
    res.status(401).json({ status: "error", error: "Post no ingresado" })
  }
}

const getPost = async function (req, res) {
  try {
    post = await Post.findById({ _id: req.params.id }).populate('informacionUser.idUsuarioVendedor').populate('informacionUser.idVehiculo').exec();
    if (post) {
      res.status(200).json(post);
    }
  } catch (err) {
    res.json({ status: "error", error: "Post no encontrado" })
  }
}

const getVehicleAlquilar = async function (req, res) {
  try {
    consultaAlquilerPost = await Post.find({}).where('tipo_publicacion').equals('Alquilar').populate('informacionUser.idUsuarioVendedor').populate('informacionUser.idVehiculo').exec()
    if (consultaAlquilerPost) {
      res.status(200).json(consultaAlquilerPost);
    }
  } catch (err) {
    res.json({ status: "error", error: "Post no encontrado" })
  }
}

const getVehicleVenta = async function (req, res) {
  try {
    consultaAlquilerPost = await Post.find({}).where('tipo_publicacion').equals('Vender').populate('informacionUser.idUsuarioVendedor').populate('informacionUser.idVehiculo').exec()
    if (consultaAlquilerPost) {
      res.status(200).json(consultaAlquilerPost);
    }
  } catch (err) {
    res.json({ status: "error", error: "Post no encontrado" })
  }
}

const getPostVehicle = async function (req, res) {
  try {
    consultaAllPost = await Post.find({}).populate('informacionUser.idUsuarioVendedor').populate('informacionUser.idVehiculo').exec()
    if (consultaAllPost) {
      res.status(200).json(consultaAllPost);
    }
  } catch (err) {
    res.json({ status: "error", error: "Post no encontrado" })
  }
}

const newPost = async function (req, res) {
  try {
    const vehicle = ({
      _id: req.body._id,
      ejes: req.body.ejes,
      mma: req.body.mma,
      tipoVehiculo: req.body.tipoVehiculo,
      fechaMatriculacion: req.body.fechaMatriculacion,
      Marca: req.body.Marca,
      modelo: req.body.modelo,
      precio: req.body.precio,
      color: req.body.color
    })
    await Vehiculo.create(vehicle)
    const post = {
      titulo: req.body.titulo,
      fecha_post: req.body.fecha_post,
      tipo_publicacion: req.body.tipo_publicacion,
      localizacion: req.body.localizacion,
      // media:'http://localhost:3000/uploads/'+req.file.filename,
      informacionUser: [{
        idUsuarioVendedor: req.body.idUsuarioVendedor,
        idVehiculo: req.body.idVehiculo
      }]
    }
    await Post.create(post)

    res.json({ status: "Ingresado Correctamente" })
    if (req.body.tipoVehiculo === "cabezatractora") {
      try {
        const cabezaTractoraVehiculo = {
          _id: req.body._id,
          cv: req.body.cv,
          adblue: req.body.adblue,
          numeroDepositos: req.body.numeroDepositos,
          kms: req.body.kms,
          combustible: req.body.combustible,
          retarder: req.body.retarde,
          vehiculo: req.body._id
        }
        await cabezatractora.create(cabezaTractoraVehiculo)

      } catch (e) {
        console.log(e)
        res.json({ status: "error", error: "Usuario no registrado tractora" })
      }
    } else if (req.body.tipoVehiculo === 'semirremolque') {
      try {
        const SemiremolqueVehiculo = {
          _id: req.body._id,
          tipoSemiremolque: req.body.tipoSemiremolque,
          tipoEje: req.body.tipoEje,
          ADR: req.body.ADR,
          vehiculo: req.body._id
        }
        await semiremolque.create(SemiremolqueVehiculo)

      } catch (err) {
        res.json({ status: "error", error: "Usuario no registrado Semiremolque" })
      }
    }
  } catch (err) {
    console.log(err)
    res.json({ status: "error", error: "Usuario no registrado" })
  }
}



module.exports = {
  newPost,
  getPostVehicle,
  getVehicleAlquilar,
  getVehicleVenta,
  getPost,
  insertUsuarioPostFavoritos,
  eliminarUsuarioPostFavoritos,
  anadirPostReport
}