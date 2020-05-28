const { ErrorHandler } = require('../utils/errorUtils');
const { jwtDecode } = require('../utils/jwtUtils');
const db = require('../db');
const { get_user } = require('../services/queries');

const authenticate = async (req, res, next) => {
  try {
    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))) {
    // console.error('No token was passed as a Bearer token in the Authorization header.',
    //   'Make sure you authorize your request by providing the following HTTP header:',
    //   'Authorization: Bearer <token>');
      throw new ErrorHandler(401, 'Missing Access Token');
    }
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer '))
    {
    //console.log('Found "Authorization" header');
    // Read the ID Token from the Authorization header.
      token = req.headers.authorization.split('Bearer ')[1];
    } else {
      throw new ErrorHandler(401, 'Missing Access Token');
    }


    if (!token) throw new ErrorHandler(401, 'Token not found');
    const decoded = await jwtDecode(token);
    const user = await db.execute(get_user, [decoded.id]);
    req.user = user[0][0];
    req.token = token;

    if (!user || !token) throw new ErrorHandler(401, 'Please login again');
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = { authenticate };
