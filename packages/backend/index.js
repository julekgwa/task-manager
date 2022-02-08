const express = require('express')
const app = express()
const cors = require('cors');
const { connectDB } = require('./utils/utils');

const logger = require('./logger/logger');
const {todoMiddleware, allowCrossDomain} = require('./middleware/todoMiddleware');

connectDB()

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(todoMiddleware)

require('./routes')(app);

app.listen(PORT, err => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`\nServer is listening on ${PORT}`);
  console.log(`\nAPI docs => http://localhost:${PORT}/apidoc`);
});