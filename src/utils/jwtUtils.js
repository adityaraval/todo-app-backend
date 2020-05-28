require('dotenv').config();
const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../utils/errorUtils');

const jwtSign = user => {
  try{
    return jwt.sign(user,

      process.env.JWT_SECRET, {


        expiresIn: '7d'
      });
  }catch(e){
    throw new ErrorHandler(500, e.message);
  }
};

const jwtDecode = token => {
  try{
    return jwt.verify(token, process.env.JWT_SECRET);
  }catch(e){
    throw new ErrorHandler(401, e.message);
  }
};

module.exports = {
  jwtSign,
  jwtDecode
};
