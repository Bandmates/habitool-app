const db = require('../models/mongooseModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jwt');
require('dotenv').config();

const signupController = {};

signupController.addUser = async (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  try {
    let user = await db.User.findOne({ email });

    if (user) {
      return next({
        status: 400,
        err: 'User already exists.',
      });
    }

    const passwordDigest = await bcrypt.hash(password, 5);
    user = await db.User.create({ name, email, password: passwordDigest });

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.SECRET_STRING,
      { expiresIn: '1h' }
    );

    res.locals = { user, token };
    next();
  } catch (e) {
    return next({
      err: 'Error while logging in',
      errorLog: `An error occurred in the signupController.addUser middleware: ${ e }`,
    });
  }
};

// signupController.addUser = async (req, res, next) => {
//   // req.body = { username: 'rabbit', password: 'carrot'}
//   const { username, password } = req.body;

//   const searchQuery = "SELECT username FROM users where username = $1";
//   const searchParams = [username];
//   try {
//     const { rowCount } = await db.query(searchQuery, searchParams);
//     console.log("number of matches in db", rowCount);
//     if (rowCount)
//       return next({ err: "error with username found already in db" });
//   } catch (e) {
//     return next({ err: "error with searching username in db: " + e });
//   }

//   const hashedPass = await bcrypt.hash(password, 5);
//   const cookie = username + " hello cookie";
//   // insert into db
//   const insertQuery =
//     "INSERT INTO users (username, password, cookie) VALUES ($1, $2, $3)";
//   const insertParams = [username, hashedPass, cookie];
//   const createTableQuery = `CREATE TABLE ${username}_history(id SERIAL PRIMARY KEY, date varchar NOT NULL, habit_id int NOT NULL, task_id int NOT NULL, description varchar, requirement int, completion int DEFAULT 0, isWeekly int DEFAULT 0, CONSTRAINT fk_habit FOREIGN KEY (habit_id) REFERENCES habit(id) ON DELETE cascade, CONSTRAINT fk_task FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE cascade )`;
//   try {
//     await db.query(insertQuery, insertParams);
//     await db.query(createTableQuery);
//   } catch (e) {
//     // fill in error message
//     return next({ err: "error with db query in addUser: " + e });
//   }
//   console.log("successfully signuped");
//   res.locals.username = username;
//   res.cookie("SSID", cookie);
//   return next();
// };

module.exports = signupController;
