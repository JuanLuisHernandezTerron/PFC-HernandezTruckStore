const Vehiculo = require('../models/Vehiculo');
const semiRemolque = require('../models/Semiremolque'); 

const getAllRemolque = async function(req,res){
    try{
        consultaSemiremolque = await semiRemolque.find().count().exec();
        res.status(200).json(consultaSemiremolque);
    }catch(err){
        res.json({status:"error",message:"No se ha encontrado Semiremolque"})
    }
}

module.exports = {
    getAllRemolque
}