const gig = require('../models/gig');
const fs = require('fs');
const path = require('path');

module.exports.viewAllGig = async (req,res) =>{
    try{
        let data = await gig.find({});
        data ? res.status(200).json(data) : res.status(400).json("Gigs not found.");
    }
    catch(err){
        console.log(err);
    }
}

module.exports.viewGig = async (req,res) =>{
    try{
        let data = await gig.findById(req.params.id).populate('userId').exec();
        data ? res.status(200).json(data) : res.status(400).json("Gig not found.");
    }
    catch(err){
        console.log(err);
    }
}

module.exports.addGig = async (req,res) =>{
    try{
        let a = [];
        for(let i of req.files){
            a.push(i.path);
        }
        req.body.images = a;
        req.body.userId = req.params.userId;
        let data = await gig.create(req.body);
        data ? res.status(200).json(data) : res.status(400).json("Gig not insert.");
    }
    catch(err){
        console.log(err);
    }
}

module.exports.deleteGig = async (req,res) =>{
    try{
        let fdata = await gig.findById(req.params.id);
        for(var i of fdata.images){
            fs.unlinkSync(path.join(__dirname,'..',i));
        }
        let data = await gig.findByIdAndDelete(req.params.id);
        data ? res.status(200).json(data) : res.status(400).json("Gig not delete.");
    }
    catch(err){
        console.log(err);
    }
}

module.exports.editGig = async (req,res) =>{
    try{
        if(req.files.length !== 0){
            let fdata = await gig.findById(req.params.id);
            for(var i of fdata.images){
                fs.unlinkSync(path.join(__dirname,'..',i));
            }
            let a = [];
            for(let i of req.files){
                a.push(i.path);
            }
            req.body.images = a;
            let data = await gig.findByIdAndUpdate(req.params.id,req.body);
            data ? res.status(200).json(data) : res.status(400).json("Gig not update.");
        }
        else{
            let data = await gig.findByIdAndUpdate(req.params.id,req.body);
            data ? res.status(200).json(data) : res.status(400).json("Gig not update.");
        }
    }
    catch(err){
        console.log(err);
    }
}

// module.exports.sortByPriceGigs = async (req,res)=>{
//     try{
//         let min = req.query.min;
//         let max = req.query.max;
//         min === 'undefined' ? min = 1 : min = req.query.min;
//         max === 'undefined' ? max = 999 : max = req.query.max;
//         let data = await gig.find({$and : [{cat : req.query.cat},{
//             price : {$gt : min, $lt : max}
//         }]}).populate('userId').exec();
//         data ? res.status(200).json(data) : res.status(400).json("Gigs not found.");
//     }
//     catch(err){
//         console.log(err);
//     }
// }

module.exports.sortByStarGigs = async (req,res)=>{
    try{
        let data;
        let min = req.query.min;
        let max = req.query.max;
        let type = req.query.type;
        min === 'undefined' ? min = 1 : min = req.query.min;
        max === 'undefined' ? max = 999 : max = req.query.max;
        if(type === 'sales'){
            data = await gig.find({$and : [{cat : req.query.cat},{
                price : {$gt : min, $lt : max}
            }]}).sort({sales : -1}).populate('userId').exec();
        }
        else if(type === 'starNumber'){
            data = await gig.find({$and : [{cat : req.query.cat},{
                price : {$gt : min, $lt : max}
            }]}).sort({starNumber : -1}).populate('userId').exec();
        }
        else{
            data = await gig.find({$and : [{cat : req.query.cat},{
                price : {$gt : min, $lt : max}
            }]}).populate('userId').exec();   
        }
        data ? res.status(200).json(data) : res.status(400).json("Gigs not found.");
    }
    catch(err){
        console.log(err);
    }
}

// module.exports.sortByCatGigs = async (req,res)=>{
//     try{
//         let data = await gig.find({cat : req.params.cat}).populate('userId').exec();
//         data ? res.status(200).json(data) : res.status(400).json("Gigs not found.");
//     }
//     catch(err){
//         console.log(err);
//     }
// }

module.exports.addByUser = async (req,res)=>{
    try{
        let data = await gig.find({userId : req.params.userId});
        data ? res.status(200).json(data) : res.status(400).json("Gig not found.");
    }
    catch(err){
        console.log(err);
    }   
}

module.exports.searchGig = async (req,res) =>{
    try{
        let search = req.params.search;
        let data = await gig.find({
            $or : [
                {title : {$regex : '.*'+search+'.*'}},
                {cat : {$regex : '.*'+search+'.*'}}
            ]
        }).populate('userId').exec();
        data ? res.status(200).json(data) : res.status(400).json("Gigs not found.");
    }
    catch(err){
        console.log(err);
    }
}

module.exports.viewLimitGig = async (req,res) =>{
    try{
        let data = await gig.find({}).limit(4).sort({_id : -1}).populate('userId').exec();
        data ? res.status(200).json(data) : res.status(200).json(null);
    }
    catch(err){
        console.log(err);
    }
}

