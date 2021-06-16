const db = require('../models/mongooseModel.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authController = {};

authController.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedData = jwt.verify(token, process.env.SECRET_STRING);
    const { id } = decodedData;

    const user = await db.User.findById(id);
    req.user = user;
    next();
  } catch (e) {
    next({
      err: "you made a fucky wucky in authController.auth",
    });
  }
};

module.exports = authController;
