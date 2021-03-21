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
  middlewareCheckID,
  middlewareCheckCreateTour,
} = require(`./../controller/toursController`);

/**
 * Router Define
 */
const router = express.Router();

/**
 * Middleware
 */

router.param('id', (request, response, next, value) => {
  console.log(`Tour id that is requested is: ${value}`);
  middlewareCheckID(request, response, next, value);
});

/**
 * Routers URL
 */
router.route('/').get(getAllTours).post(middlewareCheckCreateTour, createTours);

router
  .route('/:id')
  .get(getSpesificTours)
  .patch(updateSpesificTours)
  .delete(deleteSpesificTours);

module.exports = router;
