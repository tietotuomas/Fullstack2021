const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const bcrypt = require('bcrypt');

const api = supertest(app);
const User = require('../models/user');

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('bcrypt', 10);
    const user = new User({ username: 'Alan Turing', passwordHash });

    await user.save();
  });

  test('creation succeeds with proper fields including a unique username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'tietotuomas',
      name: 'Tuomas',
      password: 'A6848',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails if username is already taken', async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: 'Alan Turing',
      name: 'Username is already in use',
      password: 'A6848',
    };
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);

    expect(result.body.error).toContain('`username` to be unique');
  });

  test('creation fails if password is too short', async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: 'MongoDB heavy user',
      name: 'Password too short',
      password: 'A6',
    };
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);

    expect(result.body.error).toContain('invalid password');
  });

  test('creation fails if username is too short', async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: 'Db',
      name: 'Username is too short',
      password: 'Db is an abbreviation for database',
    };
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);

    expect(result.body.error).toContain('is shorter than the minimum');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
