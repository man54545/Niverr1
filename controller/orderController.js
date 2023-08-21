const order = require('../models/order');
const gig = require('../models/gig');

module.exports.viewAllOrder = async (req,res) =>{
    try{
        let data = await order.find({});
        data ? res.status(200).json(data) : res.status(400).json("Orders not found.");
    }
    catch(err){
        console.log(err);
    }
}

module.exports.viewOrder = async (req,res) =>{
    try{
        let data = await order.findById(req.params.id);
        data ? res.status(200).json(data) : res.status(400).json("Order not found.");
    }
    catch(err){
        console.log(err);
    }
}

module.exports.addOrder = async (req,res) =>{
    try{
        let fdata = await gig.findById(req.body.gigId);
        await gig.findByIdAndUpdate(req.body.gigId,{
            sales : JSON.parse(fdata.sales)+1
        });
        let data = await order.create(req.body);
        data ? res.status(200).json(data) : res.status(400).json("Order not insert.");
    }
    catch(err){
        console.log(err);
    }
}

module.exports.deleteOrder = async (req,res) =>{
    try{
        let data = await order.findByIdAndDelete(req.params.id);
        data ? res.status(200).json(data) : res.status(400).json("Order not delete.");
    }
    catch(err){
        console.log(err);
    }
}

module.exports.editOrder = async (req,res) =>{
    try{
        let data = await order.findByIdAndUpdate(req.params.id,req.body);
        data ? res.status(200).json(data) : res.status(400).json("Order not update.");
    }
    catch(err){
        console.log(err);
    }
}

module.exports.viewOrderByBuyer = async (req,res)=>{
    try{
        let data = await order.find({buyerId : req.params.buyerId}).populate('gigId').exec();
        data ? res.status(200).json(data) : res.status(400).json("Order not found.");
    }
    catch(err){
        console.log(err);
    }
}

module.exports.viewOrderByGig = async (req,res)=>{
    try{
        let data = await order.find({gigId : req.params.gigId}).populate('buyerId').populate('gigId');
        data ? res.status(200).json(data) : res.status(400).json("Order not found.");
    }
    catch(err){
        console.log(err);
    }
}