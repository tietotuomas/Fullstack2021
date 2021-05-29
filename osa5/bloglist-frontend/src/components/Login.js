import React from "react";

const Login = ({ user, password, handleLogin, setUser, setPassword }) => (
  <div>
    <form onSubmit={handleLogin}>
      username
      <input
        type="text"
        value={user}
        name="Username"
        onChange={({ target }) => setUser(target.value)}
      ></input>
      <br></br>
      password
      <input
        type="password"
        value={password}
        name="Password"
        onChange={(event) => setPassword(event.target.value)}
      ></input>
      <br></br>
      <button type="submit">login</button>
    </form>
  </div>
);

export default Login;
