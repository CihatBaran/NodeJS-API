/**
 * Importing
 */
const fs = require('fs');
const uuidv4 = require('uuid');

/**
 * File System Reading
 */
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf8')
);

/**
 * Middleware
 * @returns next()
 */
const middlewareCheckID = (request, response, next, value) => {
  let tour = tours.find((tour) => {
    return tour.id.toString() === request.params.id;
  });
  if (!tour) {
    return response.status(400).send({
      status: 'fail',
      message: 'there is no such a tour...Middleware stack',
    });
  }
  next();
};

const middlewareCheckCreateTour = (req, res, next) => {
  const requestObject = req.body;
  if (requestObject['price'] && requestObject['name']) {
    next();
  } else {
    return res.status(400).send({
      status: 'fail',
      message: 'You should have price and name to be able to create ',
    });
  }
};

/**
 * CRUD Functions
 * @param request
 * @param response
 * @return serverResponse
 */

const getAllTours = (request, response) => {
  response.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const createTours = (request, response) => {
  const newId = uuidv4.v4();

  const newTour = { id: newId, ...request.body };
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      response.status(201).json({
        status: 'success',
        results: tours.length,
        data: {
          newTour,
        },
      });
    }
  );
};

// => /api/v1/tours/:id you have to spesify id
// => /api/v1/tours/:id? now it is optional to spesify id
const getSpesificTours = (request, response) => {
  response.status(200).send({
    status: 'success',
    result: tour === '' ? 0 : 1,
    data: {
      tour,
    },
  });
};

const updateSpesificTours = (request, response) => {
  let newTour = request.body;

  for (const property in newTour) {
    tour[property] = newTour[property];
  }

  tours.forEach((element) => {
    if (element.id.toString() === tour.id.toString()) {
      element = tour;
    }
  });

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      response.status(200).send({
        status: 'success',
        data: {
          tour,
        },
      });
    }
  );
};

const deleteSpesificTours = (request, response) => {
  let tour = tours.find((tour) => {
    return tour.id.toString() === request.params.id;
  });

  let index = tours.indexOf(tour) || null;

  tours.splice(index, 1);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      response.status(204).send({
        status: 'success',
        data: null,
      });
    }
  );
};

module.exports = {
  getAllTours,
  createTours,
  updateSpesificTours,
  getSpesificTours,
  deleteSpesificTours,
  middlewareCheckID,
  middlewareCheckCreateTour,
};
