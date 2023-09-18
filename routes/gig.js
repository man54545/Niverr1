const gigController = require('../controller/gigController');
const express = require('express');
const multer = require('multer');
const routes = express.Router();

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null, 'upload/gig');
    },
    filename : (req, file, cb)=>{
        cb(null, file.fieldname+'-'+Date.now());
    }
});

let upload = multer({storage : storage});

routes.get('/view_all_gig', gigController.viewAllGig);
routes.get('/view_gig/:id', gigController.viewGig);
routes.post('/add_gig/:userId',upload.array('images',10), gigController.addGig);
routes.delete('/delete_gig/:id', gigController.deleteGig);
routes.put('/update_gig/:id',upload.array('images',10), gigController.editGig);

routes.get('/search_gig/:search', gigController.searchGig);
routes.get('/view_gig_limit', gigController.viewLimitGig);
routes.get('/view_gig_star', gigController.sortByStarGigs);
// routes.get('/view_gig_fav', gigController.sortByFavGigs);
// routes.get('/view_gig', gigController.sortByPriceGigs);
// routes.get('/view_gig_cat/:cat', gigController.sortByCatGigs);
routes.get('/view_gig_user/:userId', gigController.addByUser);

module.exports = routes;