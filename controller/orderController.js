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
        let page = 1;
        let per_page = 5;
        let search = '';

        if(req.body.page){
            page = JSON.parse(req.body.page);
        }
        if(req.body.per_page){
            per_page = JSON.parse(req.body.per_page);
        }
        if(req.body.search){
            search = req.body.search;
        }

        let data = await order.find({buyerId : req.params.buyerId,
            $or : [
                {title : {$regex : '.*'+search+'.*'}}
            ]
        }).skip((page - 1) * per_page).populate('gigId').limit(per_page).exec();

        let total = await order.find({buyerId : req.params.buyerId,
            $or : [
                {title : {$regex : '.*'+search+'.*'}}
            ]
        }).countDocuments();

        data ? res.status(200).json({
            total : Math.ceil(total/per_page),
            cur : page,
            next : page + 1,
            prev : page - 1,
            search : search,
            data : data,
        }) : res.status(400).json("Order not found.");
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