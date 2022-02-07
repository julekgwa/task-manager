const HttpStatus = require('http-status-codes');
const mongoose = require('mongoose');

const PASSWORD = process.env.PASSWORD
const USERNAME = process.env.USERNAME
const DATABASE = process.env.DATABASE

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.olmlh.mongodb.net/${DATABASE}?retryWrites=true&w=majority`
    );

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

const ERROR_MSG =
  'Looks like the server is taking too long to respond, please try again later';
const CONN_ERROR =
  'There was an error connecting to the server. Please try again later';

function formatTime(milli) {
  if (typeof milli !== 'number') {
    return '00:00:00';
  }

  const date = new Date(milli);

  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

function requestErrorHandler(error) {
  let status = HttpStatus.INTERNAL_SERVER_ERROR;
  let data = { message: ERROR_MSG };

  if (error.code === 'ECONNABORTED') {
    status = HttpStatus.REQUEST_TIMEOUT;
  } else if (error.code === 'ENOTFOUND') {
    data.message = CONN_ERROR;
  } else if (
    error &&
    error.response &&
    typeof error.response.data === 'object' &&
    error.response.data.error
  ) {
    data = {
      message: error.response.data.error,
    };
    status = error.response.status;
  } else {
    (status =
      (error && error.response && error.response.status) ||
      HttpStatus.INTERNAL_SERVER_ERROR),
      (data = (error && error.response && error.response.data) || {
        message: CONN_ERROR,
      });
  }

  console.log('ERROR', status)

  return {
    status,
    data,
  };
}

function mapPathParams(url, params) {
  if (!params || Array.isArray(params) || typeof params !== 'object') {
    return url;
  }

  for (const key in params) {
    if (params[key]) {
      url = url.replace(`{${key}}`, params[key]);
    }
  }

  return url;
}

module.exports = {
  formatTime,
  requestErrorHandler,
  mapPathParams,
  connectDB
};
