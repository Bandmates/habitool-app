const jwt = require('jwt');
require('dotenv').config();

const authController = {};

authController.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedData = jwt.verify(token, process.env.SECRET_STRING);
    req.userId = decodedData?.id;

  } catch (e) {
    next({
      err: "you made a fucky wucky in authController.auth",
    });
  }
};

module.exports = authController;
