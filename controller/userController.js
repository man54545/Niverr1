const user = require('../models/user');

module.exports.viewAllUser = async (req,res) =>{
    try{
        let data = await user.find({});
        data ? res.status(200).json(data) : res.status(400).json("Users not found.");
    }
    catch(err){
        console.log(err);
    }
}

module.exports.viewUser = async (req,res) =>{
    try{
        let data = await user.findById(req.params.id);
        data ? res.status(200).json(data) : res.status(400).json("User not found.");
    }
    catch(err){
        console.log(err);
    }
}

module.exports.addUser = async (req,res) =>{
    try{
        if(req.body.password === req.body.cpassword){
            if(req.file){
                req.body.img = user.path+'/'+req.file.filename;
                let data = await user.create(req.body);
                data ? res.status(200).json(data) : res.status(200).json({msg:"User not register."});
            }
            else{
                let data = await user.create(req.body);
                data ? res.status(200).json(data) : res.status(200).json({msg:"User not register."});
            }
        }
        else{
            res.json(null);
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.deleteUser = async (req,res) =>{
    try{
        let data = await user.findByIdAndDelete(req.params.id);
        data ? res.status(200).json(data) : res.status(400).json("User not delete.");
    }
    catch(err){
        console.log(err);
    }
}

module.exports.editUser = async (req,res) =>{
    try{
        let data = await user.findByIdAndUpdate(req.params.id,req.body);
        data ? res.status(200).json(data) : res.status(400).json("User not update.");
    }
    catch(err){
        console.log(err);
    }
}

module.exports.viewByEmail = async (req,res) =>{
    try{
        let data = await user.findOne({email : req.body.email});
        data ? res.status(200).json(data) : res.status(200).json(null);
    }
    catch(err){
        console.log(err);
    }
}

module.exports.setPass = async (req,res) =>{
    try{
        if(req.body.password == req.body.cpassword){
            let data = await user.findByIdAndUpdate(req.body.id,{password : req.body.password});
            data ? res.status(200).json(data) : res.status(400).json("User not update.");
        }
        else{   
            res.status(200).json(null);
        }
    }
    catch(err){
        console.log(err);
    }
}