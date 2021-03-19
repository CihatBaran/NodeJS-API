/**
 * Importing
 */
const express = require('express');

const {
  getAllTours,
  createTours,
  updateSpesificTours,
  getSpesificTours,
  deleteSpesificTours,
} = require(`./../controller/toursController`);

/**
 * Router Define
 */
const router = express.Router();

/**
 * Routers URL
 */
router.route('/').get(getAllTours).post(createTours);

router
  .route('/:id')
  .get(getSpesificTours)
  .patch(updateSpesificTours)
  .delete(deleteSpesificTours);

module.exports = router;
