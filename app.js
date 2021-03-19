/**
 * Importing
 */
const express = require('express');
const morgan = require('morgan');

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

app.use((request, response, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use(morgan('dev'));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

/**
 * PORTS
 */
app.listen(3000, () => {
  console.log('app running');
});
