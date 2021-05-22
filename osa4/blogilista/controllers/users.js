const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');
const logger = require('../utils/logger');

usersRouter.get('/', async (request, response) => {
  logger.info('Fetching all the users');
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
  });

  response.status(200).json(users);
});

usersRouter.post('/', async (request, response, next) => {
  logger.info('Creating a new user');
  const validPassword =
    request.body.password === null ? false : request.body.password.length > 2;
  if (!validPassword) {
    return response.status(401).json({
      error: 'invalid password',
    });
  }
  const hashedPassword = await bcrypt.hash(request.body.password, 10);
  const user = new User({
    username: request.body.username,
    password: hashedPassword,
    name: request.body.name,
  });
  try {
    const savedUser = await user.save();
    response.status(200).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
