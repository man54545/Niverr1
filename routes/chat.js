const express = require('express');
const routes = express.Router();
const chatController = require('../controller/chatController');
const chat = require('../models/chat');

routes.post('/add_chat', chatController.AddChats);
routes.post('/upload_img',chat.upload, chatController.uploadImg);

module.exports = routes;