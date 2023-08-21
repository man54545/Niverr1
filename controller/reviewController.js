const review = require('../models/review');
const gig = require('../models/gig');
const user = require('../models/user');

module.exports.viewAllReview = async (req,res) =>{
    try{
        let data = await review.find({});
        data ? res.status(200).json(data) : res.status(400).json("Reviews not found.");
    }
    catch(err){
        console.log(err);
    }
}

module.exports.viewReview = async (req,res) =>{
    try{
        let data = await review.findById(req.params.id);
        data ? res.status(200).json(data) : res.status(400).json("Review not found.");
    }
    catch(err){
        console.log(err);
    }
}

module.exports.addReview = async (req,res) =>{
    try{
        let sum = 0;
        let data = await review.create(req.body);
        let fdata = await review.find({gigId : req.body.gigId});
        let count = await review.find({gigId : req.body.gigId}).countDocuments();
        for(var i of fdata){
            sum += i.star;
        }
        await gig.findByIdAndUpdate(req.body.gigId,{
            starNumber : Math.round(sum/count)
        });
        data ? res.status(200).json(data) : res.status(400).json("Review not insert.");
    }
    catch(err){
        console.log(err);
    }
}

module.exports.deleteReview = async (req,res) =>{
    try{
        let data = await review.findByIdAndDelete(req.params.id);
        data ? res.status(200).json(data) : res.status(400).json("Review not delete.");
    }
    catch(err){
        console.log(err);
    }
}

module.exports.editReview = async (req,res) =>{
    try{
        let data = await review.findByIdAndUpdate(req.params.id,req.body);
        data ? res.status(200).json(data) : res.status(400).json("Review not update.");
    }
    catch(err){
        console.log(err);
    }
}

module.exports.viewGigReview = async (req,res) =>{
    try{
        let data = await review.find({gigId : req.params.gigId}).populate('gigId').populate('userId').exec();
        data ? res.status(200).json(data) : res.status(400).json("Review not found.");
    }
    catch(err){
        console.log(err);
    }
}