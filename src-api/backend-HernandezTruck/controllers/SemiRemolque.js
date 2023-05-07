const Vehiculo = require('../models/Vehiculo');
const semiRemolque = require('../models/Semiremolque'); 

const getinfoRemolque = async function(req,res){
    try{
        console.log(req.params.idVehicle)
        consultaInfoRemolque = await semiRemolque.findById({_id:req.params.idVehicle}).populate('vehiculo').exec();
        res.status(200).json(consultaInfoRemolque);
    }catch(err){
        res.json({status:"error",message:"No se ha encontrado cabezas tractora"})
    }
}

const getAllRemolque = async function(req,res){
    try{
        consultaSemiremolque = await semiRemolque.find().count().exec();
        res.status(200).json(consultaSemiremolque);
    }catch(err){
        res.json({status:"error",message:"No se ha encontrado Semiremolque"})
    }
}

module.exports = {
    getAllRemolque,
    getinfoRemolque
}