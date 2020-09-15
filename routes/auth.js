const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controllers/authController');

const {runValidation} = require('../validators/indexValidator');
const {userSignUpValidator, userSigninValidator} = require('../validators/authValidator');

router.post('/signup', userSignUpValidator, runValidation, signup);
router.post('/signin', userSigninValidator, runValidation, signin)

 module.exports = router;