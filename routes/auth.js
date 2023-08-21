const express = require('express');
const routes = express.Router();
const authController = require('../controller/authController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination : (req,file,cb)=>{
    cb(null, 'upload/user');
  },
  filename : (req,file,cb)=>{
    cb(null, file.fieldname+'-'+Date.now());
  }
})

let upload =multer({storage : storage});

routes.post('/register',upload.single('img'), authController.register);
routes.post('/login', authController.login);
routes.post('/logout', authController.logout);

module.exports = routes;