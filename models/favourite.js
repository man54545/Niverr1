const mongoose = require('mongoose');

const favSchema = mongoose.Schema({
    gigId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'gig',
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
},{timestamps : true});

module.exports = mongoose.model('favourite',favSchema);