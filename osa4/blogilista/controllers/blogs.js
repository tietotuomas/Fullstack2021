const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { userExtractor } = require('../utils/middleware');

const logger = require('../utils/logger');

blogsRouter.get('/', async (request, response) => {
  logger.info('Fetching all the resources');
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
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

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  logger.info('Creating a new resource');

  const user = request.user;
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes === undefined ? 0 : request.body.likes,
    user: user._id,
  });
  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    return response.status(201).json(savedBlog);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  logger.info('Deleting a resource');
  const user = request.user;

  try {
    const blog = await Blog.findById(request.params.id);
    if (!(blog.user.toString() === user._id.toString())) {
      return response
        .status(401)
        .json({ error: 'not authorized to delete this blog' });
    }
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  logger.info('Updating a resource');

  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes === undefined ? 0 : request.body.likes,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    response.json(updatedBlog);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
