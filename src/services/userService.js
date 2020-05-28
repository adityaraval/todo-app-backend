
const db = require('../db');
const {
  create_user,
  update_user_profile,
  update_user_password,
  get_user,
  get_user_by_email,
} = require('./queries');
const { ErrorHandler } = require('../utils/errorUtils');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { jwtSign } = require('../utils/jwtUtils');

//will be used for user signup
const userSignup = async (userObject) => {
  try {
    const found_user = await db.execute(get_user_by_email, [userObject.email]);
    //check if user already exists
    if (!_.isEmpty(found_user[0])) {
      throw new ErrorHandler(422,`User already exists with ${userObject.email}`);
    } else {
      const hashed_password = bcrypt.hashSync(userObject.password,bcrypt.genSaltSync(10))
      return await db.execute(create_user, [
        userObject.email,
        userObject.name,
        true,
        hashed_password]
      );
    }
  } catch (e) {
    throw new ErrorHandler(e.statusCode || 500, e.message);
  }
}

const userLogin = async (userObject) => {
  try {
    const found_user = await db.execute(get_user_by_email, [userObject.email]);
    if (!_.isEmpty(found_user[0])) {
      if (bcrypt.compareSync(userObject.password,found_user[0][0].hashed_password)) {
        //generate jsonwebtoken
        const generatedToken = jwtSign({
          id: found_user[0][0].id,
          email: userObject.email
        });
        //delete password before sending the user
        const user = found_user[0][0];
        delete user.hashed_password;
        return {
          token: generatedToken,
          user: user,
          message: 'Login Successful'
        };
      } else {
        throw new ErrorHandler(422,`Incorrect password with ${userObject.email}`);
      }
    } else {
      throw new ErrorHandler(404,`User not found with ${userObject.email}`);
    }
  } catch (e) {
    throw new ErrorHandler(e.statusCode || 500, e.message);
  }
}

const getUserById = async (userId) => {
  try {
    const found_user = await db.execute(get_user, [userId]);
    if (!_.isEmpty(found_user[0])) {
        //delete password before sending the user
        const user = found_user[0][0];
        delete user.hashed_password;
      return user;
    } else {
      throw new ErrorHandler(404,`User not found`);
    }
  } catch (e) {
    throw new ErrorHandler(e.statusCode || 500, e.message);
  }
}

const updateUser = async (userId,userObject) => {
  try {
    const found_user = await db.execute(get_user, [userId]);
    if (!_.isEmpty(found_user[0])) {
      return await db.execute(update_user_profile,[userObject.name,userObject.email,userId]);
    } else {
      throw new ErrorHandler(404,`User not found`);
    }
  } catch (e) {
    throw new ErrorHandler(e.statusCode || 500, e.message);
  }
}

const updatePassword = async (userId,userObject) => {
  try {
    const found_user = await db.execute(get_user, [userId]);
    if (!_.isEmpty(found_user[0])) {
      const hashed_password = bcrypt.hashSync(userObject.password,bcrypt.genSaltSync(10))
      return await db.execute(update_user_password,[hashed_password,userId]);
    } else {
      throw new ErrorHandler(404,`User not found`);
    }
  } catch (e) {
    throw new ErrorHandler(e.statusCode || 500, e.message);
  }
}

module.exports = {
  userSignup,
  userLogin,
  updateUser,
  getUserById,
  updatePassword,
}