const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const logger = require('../utils/logger');

blogsRouter.get('/', async (request, response) => {
  logger.info('Fetching all the resources');
  const blogs = await Blog.find({});
  response.status(200).json(blogs);
});

blogsRouter.get('/:id', async (request, response, next) => {
  logger.info('Fetching a single resource');
  try {
    const foundBlog = await Blog.findById(request.params.id);

    if (foundBlog) {
      response.status(200).json(foundBlog.toJSON());
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.post('/', async (request, response, next) => {
  logger.info('Creating a new resource');
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes === undefined ? 0 : request.body.likes,
  });
  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  logger.info('Deleting a resource');
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
