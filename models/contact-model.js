const {Schema, model} = require("mongoose")
// const { required } = require("../validators/validators")

const contactSchema = new Schema({
    username : { type: String , required: true},
    email : { type: String , required: true},
    message : { type: String , required: true},
})

// create a model or collection

const Contact = new model("Contact",contactSchema)
module.exports = Contact