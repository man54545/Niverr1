const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    gigId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'gig',
        required : true
    },
    img :{
        type : String,
        required : false
    },
    title :{
        type : String,
        required : true
    },
    price :{
        type : Number,
        required : true
    },
    sellerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    buyerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    isCompleted :{
        type : Boolean,
        default : false
    },
    payment :{
        type : String,
        required : true
    },
},{timestamps : true});

module.exports = mongoose.model('order',orderSchema);