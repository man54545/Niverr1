const express = require('express');
const routes = express.Router();
const contactController = require('../controller/contactController');

routes.get('/view_contact', contactController.viewAllContact);
routes.post('/add_contact', contactController.addContact);
routes.delete('/delete_contact/:id', contactController.deleteContact);

module.exports = routes;
