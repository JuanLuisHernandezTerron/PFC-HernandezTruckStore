const Compra = require('./../models/Compra');
const Vehiculo = require('./../models/Vehiculo')
const semiremolque = require('./../models/Semiremolque')
const cabezaTractora = require('./../models/Tractora');
const Post = require('../models/Post');

const agregarCompra = async function (req,res){
    try{
        const operacionCompra = ({
            informacionCompra:[{
                idUsuarioVendedor:req.params.idUserVendedor,
                idPost:req.params.idPost,
                idUsuarioComprador:req.params.idUserComprador
            }]
        })
       await Compra.create(operacionCompra);
       res.status(200).json('Operacion de Compra Exitosa');

    }catch(err){
        res.json({ status: "error", error: "Operacion No introducida" })
    }
}

const getinfoCompra = async function (req, res){
    try{
        informacionCompras = await Compra.find().populate('informacionCompra.idUsuarioVendedor').populate('informacionCompra.idPost').populate('informacionCompra.idUsuarioComprador').exec()
        res.status(200).json(informacionCompras);
    }catch(err){
        res.json({ status: "error", error: "getInfo No encontrada"})
    }
}

const cancelarOperacion = async function (req,res) {
    try{
        await Compra.deleteOne({_id:req.params.idOperacion})
       res.status(200).json('Operacion Eliminada Exitosamente');
    }catch(err){
        res.json({ status: "error", error: "getInfo No encontrada"})
    }
}

const confirmarCompra = async function (req, res){
    try{
        await Compra.deleteOne({_id:req.params.idOperacion})
        await Vehiculo.deleteOne({_id:req.params.idVehiculo})
        if (req.params.tipoVehiculo === 'cabezatractora') {
            await cabezaTractora.deleteOne({_id:req.params.idVehiculo})
           }else if(req.params.tipoVehiculo === 'semirremolque'){
            await semiremolque.deleteOne({_id:req.params.idVehiculo})
        }
        await Post.deleteOne({_id:req.params.idPost})

       res.status(200).json('Operacion Eliminada Exitosamente');
    }catch(err){
        res.json({ status: "error", error: "getInfo No encontrada"})
    }
}

module.exports = {
    agregarCompra,
    getinfoCompra,
    confirmarCompra,
    cancelarOperacion
}