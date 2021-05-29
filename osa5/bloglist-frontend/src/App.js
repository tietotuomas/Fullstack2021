import React, { useState, useEffect } from "react";
import OldBlog from "./components/OldBlog";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Login from "./components/Login";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ message: null, error: false });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(event);
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
      setMessage({ message: "Login successful", error: false });
      setTimeout(() => {
        setMessage({ message: null, error: false });
      }, 3333);
    } catch (error) {
      setMessage({ message: "Wrong username or password", error: true });
      setTimeout(() => {
        setMessage({ message: null, error: false });
      }, 3333);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const handleNewBlog = async (event) => {
    event.preventDefault();
    const newBlog = { author: author, title: title, url: url };
    console.log(newBlog);

    try {
      const returnedBlog = await blogService.create(newBlog, user);
      setBlogs(blogs.concat(returnedBlog));
      setMessage({
        message: `A new blog create: ${title} by ${author}`,
        error: false,
      });
      setTimeout(() => {
        setMessage({ message: null, error: false });
      }, 3333);
      setAuthor("");
      setTitle("");
      setUrl("");
    } catch (error) {
      console.log(error);
      setMessage({ message: "Creating a new blog failed.", error: true });
      setTimeout(() => {
        setMessage({ message: null, error: false });
      }, 3333);
    }
  };

  console.log("rendering...\n", username, "\n", password);

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message.message} error={message.error} />
        <Login
          user={username}
          password={password}
          setUser={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message.message} error={message.error} />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      {blogs.map((blog) => (
        <OldBlog key={blog.id} blog={blog} />
      ))}
      <NewBlog
        handleSubmit={handleNewBlog}
        author={author}
        setAuthor={setAuthor}
        title={title}
        setTitle={setTitle}
        url={url}
        setUrl={setUrl}
      />
    </div>
  );
};

export default App;
