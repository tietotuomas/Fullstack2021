import React, { useState } from "react";
import PropTypes from "prop-types";
const Blog = ({ blog, addLike, user, handleRemove }) => {
  const [showAll, setShowAll] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const createdByLoggedUser = blog.user.username === user.username;

  const handleLikeClick = () => {
    addLike(blog);
  };

  const handleRemoveClick = () => {
    handleRemove(blog);
  };

  const toggleView = () => {
    if (showAll) {
      setShowAll(false);
    } else {
      setShowAll(true);
    }
  };
  if (showAll && createdByLoggedUser) {
    return (
      <div style={blogStyle}>
        <div>
          <li>
            {blog.title} {blog.author}
            <button onClick={toggleView}> hide</button>
          </li>
          <li>{blog.url}</li>
          <li>
            {blog.likes}
            <button onClick={handleLikeClick}> like</button>
          </li>
          <li>{blog.user.name}</li>
          <li>
            <button onClick={handleRemoveClick}>remove</button>
          </li>
        </div>
      </div>
    );
  }

  if (showAll) {
    return (
      <div style={blogStyle}>
        <div>
          <li>
            {blog.title} {blog.author}
            <button onClick={toggleView}> hide</button>
          </li>
          <li>{blog.url}</li>
          <li>
            {blog.likes}
            <button onClick={handleLikeClick}> like</button>
          </li>
          <li>{blog.user.name}</li>
        </div>
      </div>
    );
  }
  return (
    <div style={blogStyle}>
      <div>
        <li>
          {blog.title} {blog.author}
          <button onClick={toggleView}>view</button>
        </li>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default Blog;
