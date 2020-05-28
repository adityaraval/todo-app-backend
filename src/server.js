const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { handleErrorResponse } = require('./utils/errorUtils');

const app = express();
const PORT = process.env.PORT || 8080;

//morgan logger config
const logger = morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ');
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//cors
app.use(cors());
app.use(logger);

/**
 * Routes Registration
 */
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');
app.use('/api/user', userRoutes);
app.use('/api/todo', todoRoutes);



//error handler
app.use((err, req, res, next) => {
  if (err) {
    handleErrorResponse(err, res);
  }
  next();
});

const main = () => {
   app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
};

main();
