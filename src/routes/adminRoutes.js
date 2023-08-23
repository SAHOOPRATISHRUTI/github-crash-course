const express = require('express');
const router = express.Router();
const adminController =require('../controllers/adminController');
const validate = require('../helper/validate')

//                                          ++++++++++++++++ADMIN+++++++++++++++++++++++                              

//------------------------------------------------------------Registation Admin------------------------------------------------------------------//
router.post('/createAdmin', validate.adminValidation, adminController.createAdmin);

//-------------------------------------------------------------- Admin login----------------------------------------------------------------//
router.post('/login', adminController.adminLogin);



module.exports = router;