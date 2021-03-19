/**
 * Importing
 */
const express = require('express');

const {
  deleteSpesificUsers,
  updateSpesificUsers,
  createUsers,
  getSpesificUsers,
  getAllUsers,
} = require('../controller/usersController');

/**
 * Creating individual Routers
 */
const router = express.Router();

/**
 * Routes
 */

router.route('/').get(getAllUsers).post(createUsers);
router
  .route('/:id')
  .get(getSpesificUsers)
  .patch(updateSpesificUsers)
  .delete(deleteSpesificUsers);

module.exports = router;
