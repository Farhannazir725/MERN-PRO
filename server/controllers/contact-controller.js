const Contact = require('../models/contact-model');

const contactForm = async(req,res)=>{
    try {
        const response = req.body;
        await Contact.create(response);
        return res.status(200).json({msg:"Message Send Succeesfully Nazir"})
        
    } catch (error) {
        return res.status(500).json({msg:"Message Not Delivered Nazir"})
    }
}

module.exports = contactForm;