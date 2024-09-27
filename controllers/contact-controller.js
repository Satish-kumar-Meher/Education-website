const Contact = require("../models/contact-model")

const contactForm = async (req,res) => {
    try{
        const responce = req.body
        await Contact.create(responce)
        return res.status(200).json({message : "message send successfully"})
    }catch(error){
        return res.status(500).json({message : "message not deliver"})
    }
}

module.exports= contactForm