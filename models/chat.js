const mongoose = require('mongoose');
const multer = require('multer');

const chatSchema = mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true,
    },
    receiverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true,
    },
    msg : {
        type : String,
        required : false
    },
    img : {
        type : String,
        required : false
    }
},{timestamps : true});

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null, 'img');
    },
    filename : (req, file, cb)=>{
        cb(null, file.fieldname+'-'+Date.now());
    }
  });
  
chatSchema.statics.upload = multer({storage : storage}).single('img');

module.exports = mongoose.model('chat',chatSchema);