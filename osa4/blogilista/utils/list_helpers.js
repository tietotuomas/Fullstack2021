const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    // console.log(
    //   'sum now:',
    //   sum,
    //   '+ blog',
    //   blog.title,
    //   'likes:',
    //   blog.likes,
    //   '= total of',
    //   sum + blog.likes,
    //   'likes'
    // );
    return sum + blog.likes;
  };
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const comparator = (favorite, blog) => {
    // console.log('blog now', blog, 'and fave now', favorite);
    if (blog.likes > favorite.likes) {
      return blog;
    } else {
      return favorite;
    }
  };
  return blogs.reduce(comparator, blogs[0]);
};

const mostBlogs = (blogs) => {
  let authors = [];

  const reducer = (authors, blog) => {
    let index = authors.findIndex((author) => author.author === blog.author);

    if (index !== -1) {
      authors[index].blogs += 1;
    } else {
      authors.push({ author: blog.author, blogs: 1 });
    }
    return authors;
  };

  authors = blogs.reduce(reducer, authors);
  const comparator = (mostBlogs, author) => {
    if (author.blogs > mostBlogs.blogs) {
      return author;
    } else {
      return mostBlogs;
    }
  };
  return authors.reduce(comparator, authors[0]);
};

const mostLikes = (blogs) => {
  let authors = [];

  const reducer = (authors, blog) => {
    let index = authors.findIndex((author) => author.author === blog.author);

    if (index !== -1) {
      authors[index].likes += blog.likes;
    } else {
      authors.push({ author: blog.author, likes: blog.likes });
    }
    return authors;
  };

  authors = blogs.reduce(reducer, authors);
  const comparator = (currentMax, author) => {
    if (author.likes > currentMax.likes) {
      return author;
    } else {
      return currentMax;
    }
  };
  return authors.reduce(comparator, authors[0]);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
