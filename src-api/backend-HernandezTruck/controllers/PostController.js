const Post = require('../models/Post');
const Vehiculo = require('../models/Vehiculo');
const cabezatractora = require('../models/Tractora'); 
const Usuario = require('../models/Usuario'); 

const getPostVehicle = async function(req,res){
  try{
    console.log('Entrando en try')    
    console.log(await Post.find({}).exec())
    
    if(consultaTractora){
      res.status(200).json(consultaTractora);
    }
  }catch(err){
    res.json({status:"error",error:"Post no encontrado"})
  }
}

const newPost = async function (req,res) {
  try{
    const vehicle={
        _id:req.body._id,
        ejes:req.body.ejes,
        mma:req.body.mma,
        tipoVehiculo: req.body.tipoVehiculo,
        fechaMatriculacion:req.body.fechaMatriculacion,
        Marca:req.body.Marca,
        modelo:req.body.modelo,
        precio:req.body.precio,
        color:req.body.color
      }
      await  Vehiculo.create(vehicle)

      const post ={
        titulo:req.body.titulo,
        fecha_post:req.body.fecha_post,
        tipo_publicacion:req.body.tipo_publicacion,
        informacionUser:[{
            idUsuarioVendedor:req.body.idUsuarioVendedor,
            idVehiculo:req.body.idVehiculo
        }]
      }
      await Post.create(post)

      res.json({status:"Ingresado Correctamente"})
      if (req.body.tipoVehiculo === "cabezatractora") {
          try{
          const cabezaTractoraVehiculo = {
              _id:req.body._id,
              cv:req.body.cv,
              adblue:req.body.adblue,
              numeroDepositos:req.body.numeroDepositos,
              kms:req.body.kms,
              combustible:req.body.combustible,
              retarder:req.body.retarde
          }
          await cabezatractora.create(cabezaTractoraVehiculo)

      }catch(e){
          console.log(e)
         res.json({status:"error",error:"Usuario no registrado tractora"})
      }
      }
     }catch(err){
         console.log(err)
         res.json({status:"error",error:"Usuario no registrado"})
  }
}



module.exports = {
    newPost,
    getPostVehicle
}