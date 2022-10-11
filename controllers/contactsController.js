const Contact = require("../models/contactModel");
const multer = require('multer')
const { v4: uuid } = require('uuid');

exports.instructions = (req,res)=>{
    res.sendFile('index.html')
}

exports.create = async (req, res) => {
    try {
        const numberArray = req.body.number.split(',')
        
        const contact = await Contact.create({
            name:req.body.name,
            number:numberArray,
            photo:req.file.filename,
        });

        res.status(200).json({ 
            status: "success",
            data: contact
        });
    } catch (error) {
        res.status(404).json({
            status:'fail',
            message: error.message
        })
    }
};

exports.delete = async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id)        
        
        res.status(200).json({ 
            status: "success",
        });
    } catch (error) {
        res.status(404).json({
            status:'fail',
            message: error.message
        })
    }
};

exports.getAllContacts = async (req, res) => {
    try {
        const allContacts= await Contact.find()        
        
        res.status(200).json({ 
            status: "success",
            data: allContacts
        });
    } catch (error) {
        res.status(404).json({
            status:'fail',
            message: error.message
        })
    }
};

exports.search = async (req, res) => {
    try {
        if(!req.query.name) throw Error('Please query by name')
        let data = await Contact.findOne({name:req.query.name})
        if(!data) data = "No such contact found"        
        
        res.status(200).json({ 
            status: "success",
            data
        });
    } catch (error) {
        res.status(404).json({
            status:'fail',
            message: error.message
        })
    }
};

exports.update = async (req,res) => {
    try {
        if (req.body.number) req.body.number = req.body.number.split(',');
        if(req.body.photo)throw Error('Cannot update photo')
        const updatedContact =await Contact.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators:true
        });

        res.status(200).json({
            status: 'success',
            data: updatedContact
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
}


//photo upload 
const multerStorage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'public')
    },
    filename: (req,file,cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null,uuid()+'.'+ext)
    }
})

const multerFilter = (req,file,cb)=>{
    if (file.mimetype.startsWith('image')){
        cb(null,true);
    }else{
        cb(new Error('Please upload an image file'),false)
    }
}

exports.upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});
