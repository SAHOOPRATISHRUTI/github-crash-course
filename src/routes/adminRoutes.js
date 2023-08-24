const express = require('express');
const router = express.Router();
const adminController =require('../controllers/adminController/adminController');
const validate = require('../helper/validate');
// const multer = require("multer");
const upload = require("../middleware/upload");
const authenticateAdmin = require("../middleware/auth")

//                                          ++++++++++++++++ADMIN+++++++++++++++++++++++                              

//------------------------------------------------------------Registation Admin------------------------------------------------------------------//
router.post('/createAdmin', validate.adminValidation, adminController.createAdmin);

//-------------------------------------------------------------- Admin login----------------------------------------------------------------//
<<<<<<< HEAD
router.post('/login', adminController.adminLogin);
router.post('/addArtist', adminController.addArtist); // add artist
router.post('/addImage',upload.single("profile_pic"), adminController.addArtistImage); // add artist
router.get('/getArtist/:id', adminController.getArtist); // show artist by id
router.get('/getAllArtist', adminController.getAllArtist); // show all artist
router.post('/deleteArtist/:id', adminController.deleteArtist); // delete artist by id
=======
router.post('/login', adminController.adminLogin);// admin login
router.post('/addArtist',authenticateAdmin,upload.single("profile_pic"), adminController.addArtist); // add artist
router.post('/changeArtistStatus',authenticateAdmin, adminController.changeArtistStatus); // change artist status
router.get('/getArtist/:id',authenticateAdmin, adminController.getArtist); // show artist by id
router.get('/getAllArtist',authenticateAdmin, adminController.getAllArtist); // show all artist
router.post('/deleteArtist/:id',authenticateAdmin, adminController.deleteArtist); // delete artist by id
>>>>>>> 98aa25321aba9d912823651477408b34e0c83da3



module.exports = router;