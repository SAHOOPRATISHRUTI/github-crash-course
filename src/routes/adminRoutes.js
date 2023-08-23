const express = require('express');
const router = express.Router();
const adminController =require('../controllers/adminController/adminController');
const validate = require('../helper/validate');
const multer = require("multer");
const upload = multer({storage:multer.memoryStorage()});
const authenticateAdmin = require("../middleware/auth")

//                                          ++++++++++++++++ADMIN+++++++++++++++++++++++                              

//------------------------------------------------------------Registation Admin------------------------------------------------------------------//
router.post('/createAdmin', validate.adminValidation, adminController.createAdmin);

//-------------------------------------------------------------- Admin login----------------------------------------------------------------//
router.post('/login', adminController.adminLogin);
router.post('/addArtist',authenticateAdmin,upload.single("profile_pic"), adminController.addArtist); // add artist
router.get('/getArtist/:id',authenticateAdmin, adminController.getArtist); // show artist by id
router.get('/getAllArtist',authenticateAdmin, adminController.getAllArtist); // show all artist



module.exports = router;