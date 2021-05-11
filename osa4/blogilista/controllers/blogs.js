const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const logger = require('../utils/logger');

blogsRouter.get('/', (request, response) => {
  logger.info('Fetching all the resources');
  Blog.find({}).then((blogs) => {
    response.status(200).json(blogs);
  });
});

blogsRouter.get('/:id', (request, response, next) => {
  logger.info('Fetching a single resource');
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.status(200).json(blog.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

blogsRouter.post('/', (request, response) => {
  logger.info('Creating a new resource');
  const blog = new Blog(request.body); //TOIMIIKO NÄIN VAI PITÄÄKÖ POIMIA BODYSTA ARVOT ERIKSEEN?

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

blogsRouter.delete('/:id', (request, response, next) => {
  logger.info('Deleting a resource');
  Blog.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
