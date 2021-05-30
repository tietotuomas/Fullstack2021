import React, { useState } from "react";

const NewBlog = ({ addNewBlog }) => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBlog = { author: author, title: title, url: url };
    addNewBlog(newBlog);
    setAuthor("");
    setTitle("");
    setUrl("");
  };
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        Title
        <input id={"title"}
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        ></input>
        <br></br>
        Author
        <input id={"author"}
          type="text"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        ></input>
        <br></br>
        URL
        <input id={"url"}
          type="text"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        ></input>
        <br></br>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default NewBlog;
