const express = require('express');
const routes = express.Router();
const orderController = require('../controller/orderController');

routes.get('/view_all_order', orderController.viewAllOrder);
routes.get('/view_order/:id', orderController.viewOrder);
routes.post('/view_buyer_order/:buyerId', orderController.viewOrderByBuyer);
routes.get('/view_gig_order/:gigId', orderController.viewOrderByGig);
routes.post('/add_order', orderController.addOrder);
routes.delete('/delete_order/:id', orderController.deleteOrder);
routes.put('/update_order/:id', orderController.editOrder);

module.exports = routes;