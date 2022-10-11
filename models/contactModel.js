const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        unique:true,
    },
    number:[{
        type:Number,
        required: true,
        unique:true,
    }],
    photo:{
        type:String,
    },
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;