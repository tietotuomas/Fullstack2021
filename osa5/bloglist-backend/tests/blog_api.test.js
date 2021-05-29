const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are correct number of blogs', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('blogs are identified by field id (not __id)', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].id).toBeDefined();
});

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs');

  const titles = response.body.map((resource) => resource.title);

  expect(titles).toContain('React patterns');
});

test('a valid blog can be added', async () => {
  const newBlog = {
    _id: '0a422bc61b54a676234d17fe',
    title: 'async/await simplifies making async calls',
    author: 'Tuomas',
    url: 'www.testi.fi',
    likes: 100,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  const titles = blogsAtEnd.map((blog) => blog.title);
  expect(titles).toContain('async/await simplifies making async calls');
});

test('an invalid blog cannot be added', async () => {
  const blogWithoutTitle = {
    author: 'Tuomas',
    url: 'www.testi.fi',
    likes: 100,
  };
  const blogWithoutUrl = {
    title: 'Jest is the new Mocha',
    author: 'Tuomas',
    likes: 0,
  };

  await api
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .expect(400)
    .expect('Content-Type', /application\/json/);

  await api
    .post('/api/blogs')
    .send(blogWithoutUrl)
    .expect(400)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
