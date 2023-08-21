const express = require('express');
const routes = express.Router();
const reviewController = require('../controller/reviewController');

routes.get('/view_all_review', reviewController.viewAllReview);
routes.get('/view_review/:id', reviewController.viewReview);
routes.post('/add_review', reviewController.addReview);
routes.delete('/delete_review/:id', reviewController.deleteReview);
routes.put('/update_review/:id', reviewController.editReview);

routes.get('/view_gig_review/:gigId', reviewController.viewGigReview);

module.exports = routes;
