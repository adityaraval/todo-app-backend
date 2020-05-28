const {
  userSignup,
  userLogin,
  updateUser,
  getUserById,
  updatePassword
} = require('../services/userService')

const signup = async (req, res, next) => {
  try {
    await userSignup(req.body);
    return res.status(200).send({
      message: "User registered successfully"
    });
  } catch (e) {
    next(e)
  }
}

const login = async (req, res, next) => {
 try {
    const user = await userLogin(req.body);
    return res.status(200).send(user);
  } catch (e) {
    next(e)
  }
}

const me = async (req, res, next) => {
  try {
    const user = await getUserById(req.user.id);
    return res.status(200).send(user);
  } catch (e) {
    next(e)
  }
}

const updateProfile = async (req, res, next) => {
  try {
    await updateUser(req.user.id,req.body);
    return res.status(200).send({
      message: "User profile updated successfully"
    });
  } catch (e) {
    next(e)
  }
}


const changePassword = async (req, res, next) => {
  try {
    await updatePassword(req.user.id,req.body);
    return res.status(200).send({
      message: "User password updated successfully"
    });
  } catch (e) {
    next(e)
  }
}


module.exports = {
  signup,
  login,
  me,
  updateProfile,
  changePassword,
}