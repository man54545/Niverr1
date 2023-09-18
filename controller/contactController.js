const contact = require('../models/contact');

module.exports.viewAllContact = async (req,res) =>{
    try{
        let data = await contact.find({});
        data ? res.status(200).json(data) : res.status(400).json("Contact not found.");
    }
    catch(err){
        console.log(err);
    }
}

module.exports.addContact = async (req,res) =>{
    try{
        req.body.username = req.body.first_name+' '+req.body.last_name;
        let data = await contact.create(req.body);
        data ? res.status(200).json(data) : res.status(400).json("Contact not insert.");
    }
    catch(err){
        console.log(err);
    }
}

module.exports.deleteContact = async (req,res) =>{
    try{
        let data = await contact.findByIdAndDelete(req.params.id);
        data ? res.status(200).json(data) : res.status(400).json("Contact not Remove.");
    }
    catch(err){
        console.log(err);
    }
}