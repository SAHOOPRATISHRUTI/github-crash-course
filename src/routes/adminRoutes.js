const express = require('express');
const router = express.Router();
const adminController =require('../controllers/adminController/adminController');
const validate = require('../helper/validate');
const multer = require("multer");
const upload = require("../middleware/upload");

//                                          ++++++++++++++++ADMIN+++++++++++++++++++++++                              

//------------------------------------------------------------Registation Admin------------------------------------------------------------------//
router.post('/createAdmin', validate.adminValidation, adminController.createAdmin);

//-------------------------------------------------------------- Admin login----------------------------------------------------------------//
router.post('/login', adminController.adminLogin);
router.post('/addArtist', adminController.addArtist); // add artist
router.post('/addImage',upload.single("profile_pic"), adminController.addArtistImage); // add artist
router.get('/getArtist/:id', adminController.getArtist); // show artist by id
router.get('/getAllArtist', adminController.getAllArtist); // show all artist



module.exports = router;