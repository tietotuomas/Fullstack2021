import React, { useState, useEffect, useRef } from "react";
import OldBlog from "./components/OldBlog";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Login from "./components/Login";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ message: null, error: false });
  const newBlogRef = useRef();

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

  const handleNewBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog, user);
      setBlogs(blogs.concat(returnedBlog));
      newBlogRef.current.toggleVisibility();
      setMessage({
        message: `A new blog created: ${newBlog.title} by ${newBlog.author}`,
        error: false,
      });
      setTimeout(() => {
        setMessage({ message: null, error: false });
      }, 3333);
    } catch (error) {
      console.log(error);
      setMessage({ message: "Creating a new blog failed.", error: true });
      setTimeout(() => {
        setMessage({ message: null, error: false });
      }, 3333);
    }
  };

  const handleNewLike = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    console.log(updatedBlog);
    try {
      const returnedBlog = await blogService.update(updatedBlog);
      console.log(returnedBlog);
      setBlogs(
        blogs.map((blog) => (blog.id !== returnedBlog.id ? blog : updatedBlog))
      );
    } catch (error) {
      setMessage({ message: "Adding a like failed.", error: true });
      setTimeout(() => {
        setMessage({ message: null, error: false });
      }, 3333);
    }
  };

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove ${blog.title}?`)) {
      try {
        await blogService.remove(blog, user);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
        setMessage({
          message: "Blog was removed successfully",
          error: false,
        });
        setTimeout(() => {
          setMessage({ message: null, error: false });
        }, 3333);
      } catch (error) {
        setMessage({ message: "Removing a blog failed.", error: true });
        setTimeout(() => {
          setMessage({ message: null, error: false });
        }, 3333);
      }
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
      {blogs
        .sort((a, b) => (a.likes > b.likes ? -1 : 1))
        .map((blog) => (
          <OldBlog
            key={blog.id}
            blog={blog}
            addLike={handleNewLike}
            user={user}
            handleRemove={handleRemove}
          />
        ))}
      <Togglable buttonLabel="create" ref={newBlogRef}>
        <NewBlog addNewBlog={handleNewBlog} />
      </Togglable>
    </div>
  );
};

export default App;
