const user = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports.register = async (req,res) =>{
    try{
        if(req.body.password === req.body.cpassword){
            if(req.file){
                req.body.img = 'upload/user/'+req.file.filename;
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

module.exports.login = async (req,res) =>{
    try{
        let data = await user.findOne({email : req.body.email});
        if(data){
            if(data.password === req.body.password){
                let jwtData = jwt.sign({id : data.id, isSeller : data.isSeller},"Coding");
                res.cookie('user',jwtData).status(200).json(data);
            }
            else{
                res.status(200).json(null);
            }
        }
        else{
            res.status(200).json(null);
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.logout = async (req,res)=>{
    res.clearCookie('user').status(200).json("User Log Out.");
}