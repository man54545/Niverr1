const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/Fiverr');

const db = mongoose.connection;

db.once('open', (err)=>{
    if(err){
        console.log("Db not connect.");
        return false;
    }
    console.log("Db connect.");
})

module.exports = db;