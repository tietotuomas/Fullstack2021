const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');
const logger = require('../utils/logger');

loginRouter.post('/', async (request, response) => {
  logger.info('User logging in');
  const user = await User.findOne({ username: request.body.username });

  const correctCredentials =
    user === null
      ? false
      : await bcrypt.compare(request.body.password, user.password);

  if (!correctCredentials) {
    return response.status(401).json({ error: 'invalid username or password' });
  }

  const userToken = { username: user.username, id: user._id };

  const token = jwt.sign(userToken, process.env.SECRET);

  logger.info(
    `Created a token "${token.substring(0, 5)}..." for ${user.username}`
  );

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});
module.exports = loginRouter;
