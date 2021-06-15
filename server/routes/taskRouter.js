const express = require('express');

const taskController = require('../controllers/taskController.js');
const authController = require('../controllers/authController.js');

const taskRouter = express.Router();

//localhost:5000/task/addtask
//localhost:5000/task

taskRouter.post(
  '/addTask',
  authController.auth,
  taskController.addTask,
  (req, res) => (
    res.status(200).json({ updatedDoc: res.locals.updatedDoc })
  )
);

taskRouter.post(
  '/removeTask',
  authController.auth,
  taskController.removeTask,
  (req, res) => (
    res.status(200).json({ updatedDoc: res.locals.updatedDoc })
  )
);

taskRouter.post(
  '/editTask',
  authController.auth,
  taskController.editTask,
  (req, res) => (
    res.status(200).json({ updatedDoc: res.locals.updatedDoc })
  )
);

module.exports = taskRouter;
