const restify = require('restify');
const path = require('path');
const corsMiddleware = require('restify-cors-middleware');
const { connectDB } = require('./utils/utils');

const logger = require('./logger/logger');
const {todoMiddleware, allowCrossDomain} = require('./middleware/todoMiddleware');

const app = restify.createServer({
  name: 'todo-app',
  log: logger
});

connectDB()

const PORT = process.env.PORT || 8080;

// api docs endpoint
// can be access from http://localhost:PORT
app.get('/*', restify.plugins.serveStatic({
    directory: path.join(__dirname, 'docs'),
    default: 'index.html'
  })
);

// for http://localhost:3000

const cors = corsMiddleware({
  origins: ['http://localhost:3000', 'http://localhost'],
  allowHeaders: ['*']
})

app.pre(cors.preflight)
app.use(cors.actual)

app.pre(todoMiddleware);

app.use(restify.plugins.bodyParser());
app.use(restify.plugins.queryParser({ mapParams: true }));

require('./routes')(app);

app.listen(PORT, err => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`\nServer is listening on ${PORT}`);
  console.log(`\nAPI docs => http://localhost:${PORT}`);
});

app.on('restifyError', function(req, res, err, next) {
//  res.status(err.status);
//  res.json(err.errors);
});
