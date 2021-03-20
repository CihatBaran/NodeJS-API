/**
 * Importing
 */
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

const tourRouter = require('./routes/toursRoute');
const userRouter = require('./routes/usersRoute');

/**
 * Creating Main App
 */
const app = express();

/**
 * MIDDLEWARE
 * @return whatever the middleware returns
 */
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

/**
 * Exporting
 */
module.exports = app;
