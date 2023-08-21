const chat = require("../models/chat");


module.exports.AddChats = async (req,res)=>{
  try {
    let data = await chat.create(req.body);
    if(data){
      res.status(200).json({msg : "Insert.", data : data});
    }
    else{
      res.status(400).json({msg : "Not Insert."});
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports.uploadImg = async (req,res)=>{
  try {
    req.body.img = req.file.path
    let data = await chat.create(req.body);
    if(data){
      res.status(200).json({msg : "Insert.", data : data});
    }
    else{
      res.status(400).json({msg : "Not Insert."});
    }
  } catch (error) {
    console.log(error);
  }
}