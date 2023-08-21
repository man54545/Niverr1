const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    gigId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'gig',
        required : true
    },
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    star :{
        type : Number,
        required : true,
        enum : [1,2,3,4,5]
    },
    desc :{
        type : String,
        required : true
    }
},{timestamps : true});

module.exports = mongoose.model('review',reviewSchema);