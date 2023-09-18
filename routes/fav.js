const express = require('express');
const routes = express.Router();
const FavController = require('../controller/favController');

routes.get('/view_fav/:id', FavController.viewAllFav);
// routes.get('/view_fav/:id', FavController.viewFav);
routes.post('/add_fav', FavController.addFav);
routes.post('/delete_fav', FavController.deleteFav);
// routes.put('/update_fav/:id', FavController.editFav);

// routes.get('/view_gig_fav/:gigId', FavController.viewGigFav);

module.exports = routes;
