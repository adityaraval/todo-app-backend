const express = require('express');
const router = express.Router();

const {
  signup,
  login,
  me,
  changePassword,
  updateProfile,
} = require('../controllers/userController');

const { authenticate } = require('../middlewares/auth');

//express joi validator
const validator = require('express-joi-validation').createValidator({
  passError: true
});
const {
  validateUserSignup,
  validateUserLogin,
  validateUserProfile,
  validateUserPassword
} = require('../utils/validationUtils');

router.post('/signup',
  validator.body(validateUserSignup), signup);

router.post('/login',
  validator.body(validateUserLogin), login);

router.get('/me', authenticate, me);

router.put('/updateProfile',
  validator.body(validateUserProfile), authenticate, updateProfile);

router.post('/changePassword',
  validator.body(validateUserPassword), authenticate, changePassword);


module.exports = router;
