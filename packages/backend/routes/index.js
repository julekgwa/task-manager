const addSubTask = require('./addSubTask');
const addTask = require('./addTask');
const getAllTasks = require('./getAllTasks');
const getTask = require('./getTask');
const updateTask = require('./updateTask');
const deleteTask = require('./deleteTask');
const userRegistration = require('./registration');
const userLogin = require('./login')

const {bodyPayloadValidator, pathParamsValidator, validateUser, validateLogin} = require('../validation/validation');

module.exports = app => {
  // '/v1/todo/subtask'
  app.post('/v1/todo/:userID/subtask', bodyPayloadValidator, addSubTask);
  app.post('/v1/todo/registration', validateUser, userRegistration)
  app.post('/v1/todo/login', validateLogin, userLogin)
// /v1/todo/task
  app.post('/v1/todo/:userID/task', bodyPayloadValidator, addTask);
  app.delete('/v1/todo/:userID/task/:id', pathParamsValidator, deleteTask);
  app.get('/v1/todo/:userID/task/:id', pathParamsValidator, getTask);
  app.put('/v1/todo/:userID/task', bodyPayloadValidator, updateTask);
  // '/v1/todo/tasks'
  app.get('/v1/todo/:userID/tasks', getAllTasks);
};
