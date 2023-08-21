const express = require('express');
const routes = express.Router();
const userController = require('../controller/userController');
const user = require('../models/user');

routes.get('/view_all_user', userController.viewAllUser);
routes.get('/view_user/:id', userController.viewUser);
// routes.post('/add_user',user.upload, userController.addUser);
routes.delete('/delete_user/:id', userController.deleteUser);
routes.put('/update_user/:id', userController.editUser);
routes.post('/view_email', userController.viewByEmail);
routes.put('/set_pass', userController.setPass);

module.exports = routes;