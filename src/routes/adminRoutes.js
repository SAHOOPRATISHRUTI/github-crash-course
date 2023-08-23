const express = require('express');
const router = express.Router();
const adminController =require('../controllers/adminController/adminController');
const validate = require('../helper/validate');
const multer = require("multer");
const upload = multer({storage:multer.memoryStorage()});

//                                          ++++++++++++++++ADMIN+++++++++++++++++++++++                              

//------------------------------------------------------------Registation Admin------------------------------------------------------------------//
router.post('/createAdmin', validate.adminValidation, adminController.createAdmin);

//-------------------------------------------------------------- Admin login----------------------------------------------------------------//
router.post('/login', adminController.adminLogin);
router.post('/addArtist',upload.single("profile_pic"), adminController.addArtist);
router.get('/getArtist/:id', adminController.getArtist);



module.exports = router;