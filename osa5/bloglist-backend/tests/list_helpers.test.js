const listHelpers = require('../utils/list_helpers');

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
  {
    _id: '0',
    title: 'MongoDB is the most popular NoSQL database',
    author: 'Tuomas',
    url: 'www.testi.fi',
    likes: 0,
    __v: 0,
  },
];

describe('total likes', () => {
  let tempArray;

  test('of only one blog with 7 likes', () => {
    tempArray = [blogs[0]];
    expect(listHelpers.totalLikes(tempArray)).toBe(7);
  });

  test('of only one blog with 0 likes', () => {
    tempArray = [blogs[blogs.length - 1]];
    expect(listHelpers.totalLikes(tempArray)).toBe(0);
  });

  test('of all the blogs', () => {
    expect(listHelpers.totalLikes(blogs)).toBe(36);
  });
});

describe('favorite blog', () => {
  let tempArray;

  test('of two blogs with with different amount of likes', () => {
    tempArray = [blogs[0], blogs[1]];
    expect(listHelpers.favoriteBlog(tempArray)).toEqual(blogs[0]);
  });

  test('of three blogs with with different amount of likes', () => {
    tempArray = [blogs[0], blogs[1], blogs[2]];
    expect(listHelpers.favoriteBlog(tempArray)).toEqual(blogs[2]);
  });

  test('of all the blogs', () => {
    expect(listHelpers.favoriteBlog(blogs)).toEqual(blogs[2]);
  });
});

describe('most blogs', () => {
  let tempArray;
  test('of two authors with different amount of blogs', () => {
    tempArray = blogs.slice(0, 3);
    expect(listHelpers.mostBlogs(tempArray)).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 2,
    });
  });
  test('of all the authors', () => {
    expect(listHelpers.mostBlogs(blogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });
});

describe('most likes', () => {
  let tempArray;
  test('of two authors with different amount of likes', () => {
    tempArray = blogs.slice(0, 1);
    expect(listHelpers.mostLikes(tempArray)).toEqual({
      author: 'Michael Chan',
      likes: 7,
    });
  });
  test('of all the authors', () => {
    expect(listHelpers.mostLikes(blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });
});
