const jwt = require('jsonwebtoken');
const User = require('../models/user');
const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('-------');
  logger.info('Method:', request.method);
  logger.info('Path:', request.path);
  logger.info('Body:', request.body);
  logger.info('-------');
  next();
};

const tokenExtractor = (request, response, next) => {
  const authHeader = request.get('authorization');
  if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
    request.token = authHeader.substring(7);
  }

  next();
};

const userExtractor = async (request, response, next) => {
  const token = jwt.verify(request.token, process.env.SECRET);

  if (!token) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  request.user = await User.findById(token.id);
  next();
};

const unknownEndpoint = (req, res) => {
  logger.error('Unknown endpoint:');
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  logger.error('errorHandler middleware activated:', error.message);

  if (error.name === 'ValidationError') {
    return res.status(401).json({ error: error.message });
  }
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' });
  }
  next();
};

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler,
};
