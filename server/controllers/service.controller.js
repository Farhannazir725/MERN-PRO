const Service = require('../models/service-model');

const services = async(req,res)=>{
    try {
        const response = await Service.find();
        if(!response){
            res.status(400).json({msg:"No Service Found"});
            return;
        }
         res.status(200).json({msg:response})
        
    } catch (error) {
        console.log(`services,${error}`);
        // return res.status(500).json({msg:"Message Not Delivered Nazir"})
    }
};

module.exports = services;