const express = require('express');
const { check, validationResult } = require('express-validator');
const app = express();
app.use(express.json());

//                       +++++++++++++++++++++++++   Admin Validation  ++++++++++++++++++++++++++++++


const adminValidation = [
          //---------------------------------------------------------------- USER NAME-----------------------------------------------------------// 
          check('userName')
            .notEmpty().withMessage('User Name is required'),
        
          //----------------------------------------------------------------PASSWORD-----------------------------------------------------------//
          check('password')
            .notEmpty().withMessage('Password is required')
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
            .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
        
          //----------------------------------------------------------------MAIL-----------------------------------------------------------------------------------------------------//
          check('email')
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Please include a valid email')
            .custom((value, { req }) => {
              if (!/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(value)) {
                throw new Error('Invalid email address');
              }
              return true;
            }),
        
          //----------------------------------------------------------------MOBILE NUMBER-----------------------------------------------------------//
          check('mobileNumber')
            .notEmpty().withMessage('Mobile Number is required')
            .isMobilePhone().withMessage('Please include a valid mobile number'),
        
        
          (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(422).json({ errors: errors.array() });
            }
            else next();
          }
        ];

        module.exports = {
          adminValidation
} 