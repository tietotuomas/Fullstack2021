import React, { useState } from "react";
import PropTypes from "prop-types";
const OldBlog = ({ blog, addLike, user, handleRemove }) => {
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
          {blog.title} {blog.author}
          <button onClick={toggleView}> hide</button>
          <br></br>
          {blog.url}
          <br></br>
          {blog.likes}
          <button onClick={handleLikeClick}> like</button>
          <br></br>
          {blog.user.name}
          <br></br>
          <button onClick={handleRemoveClick}>remove</button>
          <br></br>
        </div>
      </div>
    );
  }

  if (showAll) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleView}> hide</button>
          <br></br>
          {blog.url}
          <br></br>
          {blog.likes}
          <button onClick={handleLikeClick}> like</button>
          <br></br>
          {blog.user.name}
          <br></br>
        </div>
      </div>
    );
  }
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleView}>view</button>
      </div>
    </div>
  );
};

OldBlog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default OldBlog;
