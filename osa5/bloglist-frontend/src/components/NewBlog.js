import React from "react";

const NewBlog = ({
  handleSubmit,
  author,
  setAuthor,
  title,
  setTitle,
  url,
  setUrl,
}) => (
  <div>
    <h2>Create new</h2>
    <form onSubmit={handleSubmit}>
      Title
      <input
        type="text"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      ></input>
      <br></br>
      Author
      <input
        type="text"
        value={author}
        onChange={(event) => setAuthor(event.target.value)}
      ></input>
      <br></br>
      URL
      <input
        type="text"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
      ></input>
      <br></br>
      <button type="submit">Create</button>
    </form>
  </div>
);

export default NewBlog;
