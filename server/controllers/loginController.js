const db = require('../models/mongooseModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jwt');
require('dotenv').config();

const loginController = {};

loginController.verifyUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await db.User.findOne({ email });

    if (!user) {
      return next({
        status: 404,
        err: 'No user found.',
      });
    }

    const passwordDigest = user.password;
    const isSamePassword = await bcrypt.compare(password, passwordDigest);

    if (!isSamePassword) {
      return next({
        status: 400,
        err: 'Invalid login credentials.',
      });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.SECRET_STRING,
      { expiresIn: '1h' }
    );

    res.locals = { success: true, user, token };
    next();
  } catch (e) {
    return next({
      err: 'Error while logging in',
      errorLog: `An error occurred in the loginController.verifyUser middleware: ${ e }`,
    });
  }
};

// loginController.verifyUser = async (req, res, next) => {
//   const { username, password } = req.body;

//   const searchQuery = "SELECT password, cookie FROM users where username = $1";
//   const searchParams = [username];
//   let hashedPass;
//   try {
//     const { rows } = await db.query(searchQuery, searchParams);
//     console.log("return array of obj", rows);
//     // [{password: fdashjfksda, cookie: jdfaslk}]
//     if (rows.length) hashedPass = rows[0].password;
//     else return next({ err: "cannot find password for some reason " + e });
//     const passwordMatched = bcrypt.compare(password, hashedPass);
//     if (passwordMatched) {
//       res.locals.username = username;
//       res.cookie("SSID", rows[0].cookie);
//     } else {
//       return next({ err: "invalid password" });
//     }
//     return next();
//   } catch (e) {
//     return next({ err: "error with searching for user pass in db: " + e });
//   }
// };

module.exports = loginController;
