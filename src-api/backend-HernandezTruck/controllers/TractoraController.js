const Vehiculo = require('../models/Vehiculo');
const cabezatractora = require('../models/Tractora'); 

const getAllTractoras = async function(req,res){
    try{
        consultaTractora = await cabezatractora.find().count().exec();
        res.status(200).json(consultaTractora);
    }catch(err){
        res.json({status:"error",message:"No se ha encontrado cabezas tractora"})
    }
}

module.exports = {
    getAllTractoras
}