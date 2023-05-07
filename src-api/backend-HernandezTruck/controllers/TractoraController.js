const Vehiculo = require('../models/Vehiculo');
const cabezatractora = require('../models/Tractora'); 

const getInfoTractora = async function(req,res){
    try{
        console.log(req.params.idVehicle)
        consultaInfoTractora = await cabezatractora.findById({_id:req.params.idVehicle}).populate('vehiculo').exec();
        res.status(200).json(consultaInfoTractora);
    }catch(err){
        res.json({status:"error",message:"No se ha encontrado cabezas tractora"})
    }
}

const getAllInfoTractoras = async function(req,res){
    try{
        consultaAllInfoTractora = await cabezatractora.find({}).populate('vehiculo').exec();
        res.status(200).json(consultaAllInfoTractora);
    }catch(err){
        res.json({status:"error",message:"No se ha encontrado cabezas tractora"})
    }
}

const getAllTractorasCount = async function(req,res){
    try{
        consultaTractora = await cabezatractora.find().count().exec();
        res.status(200).json(consultaTractora);
    }catch(err){
        res.json({status:"error",message:"No se ha encontrado cabezas tractora"})
    }
}

module.exports = {
    getAllTractorasCount,
    getAllInfoTractoras,
    getInfoTractora
}