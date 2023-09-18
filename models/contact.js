const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    company_website : {
        type : String,
        required : true
    },
    company_name : {
        type : String,
        required : false
    },
    title : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : false
    }
},{timestamps : true});

module.exports = mongoose.model('contact',contactSchema);