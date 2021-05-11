const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('-------');
  logger.info('Method:', request.method);
  logger.info('Path:', request.path);
  logger.info('Body:', request.body);
  logger.info('-------');
  next();
};

const unknownEndpoint = (req, res) => {
  logger.error('Unknown endpoint:');
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  logger.info('errorHandler middleware activated:', error.message);
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
