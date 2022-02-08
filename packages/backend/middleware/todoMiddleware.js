const logger = require('../logger/logger');

function todoMiddleware(req, res, next) {

  req.userID = req.params.userID;

  req.log = logger.child();

  req.log.info({ req: req }, 'Starting request...');

  next();
}

function allowCrossDomain(req, res, next) {
  res.header('Access-Control-Allow-Origin', "http://localhost:3000");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', '*');
  next();
}

module.exports = {
  todoMiddleware,
  allowCrossDomain
};