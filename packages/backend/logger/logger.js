const bunyan = require('bunyan');
const {formatTime} = require('../utils/utils');

const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

function reqSerializer(req) {
  return {
    method: req.method,
    url: req.url
  };
}

const log = bunyan.createLogger({
  name: 'todo-app-logger',
  serializers: {
    req: reqSerializer
  },
  streams: [
    {
      level: LOG_LEVEL,
      stream: process.stdout
    }
  ]
});

module.exports = log;
