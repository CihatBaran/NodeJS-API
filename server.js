/**
 * Setting up environment variable
 * It should be above everything to be able to become reachable
 */
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
/**
 * Importing
 */
const app = require('./app');

/**
 * PORTS
 */
app.listen(process.env.PORT * 1, () => {
  console.log('app running');
});
