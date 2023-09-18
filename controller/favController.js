const fav = require('../models/favourite');

module.exports.viewAllFav = async (req,res) =>{
    try{
        let data = await fav.find({userId : req.params.id}).populate('gigId').populate('userId').exec();
        data ? res.status(200).json(data) : res.status(400).json("Favs not found.");
    }
    catch(err){
        console.log(err);
    }
}

module.exports.addFav = async (req,res) =>{
    try{
        let data = await fav.create(req.body);
        data ? res.status(200).json(data) : res.status(400).json("Fav not insert.");
    }
    catch(err){
        console.log(err);
    }
}   

module.exports.deleteFav = async (req,res) =>{
    try{
        let fdata = await fav.findOne({gigId : req.body.gigId, userId : req.body.userId});
        let data = await fav.findByIdAndDelete(fdata.id);
        data ? res.status(200).json(data) : res.status(400).json("Fav not Remove.");
    }
    catch(err){
        console.log(err);
    }
}