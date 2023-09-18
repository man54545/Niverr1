const mongoose = require('mongoose');

const gigSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    title : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    totalStars : {
        type : Number,
        default : 0
    },
    starNumber : {
        type : Number,
        default : 0
    },
    cat : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    images : {
        type : Array,
        required : true
    },
    shortTitle : {
        type : String,
        required : true
    },
    shortDesc : {
        type : String,
        required : true
    },
    deliveryTime  : {
        type : Number,
        required : true
    },
    revisionNumber : {
        type : Number,
        required : true
    },
    feachers : {
        type : Array,
    },
    fav : {
        type : Boolean,
        default : false
    },
    sales : {   
        type : Number,
        default : 0
    },
},{timestamps : true});

module.exports = mongoose.model('gig',gigSchema);