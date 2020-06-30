import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import AuthService from "../Services/AuthService";
import Message from "../Components/Message";

const Login = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);
  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    AuthService.login(user).then((data) => {
      const { isAuthenticated, user, message } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push("/todos");
      } else {
        setMessage(message);
      }
    });
  };
  return (
    <div>
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <h3 className="text-center">Please sign in</h3>
        <label htmlFor="username" className="sr-only">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          name="username"
          placeholder="Enter username"
          onChange={(e) => onChangeHandler(e)}
        />
        <label htmlFor="Password" className="sr-only">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          name="password"
          placeholder="Enter password"
          onChange={(e) => onChangeHandler(e)}
        />
        <button className="btn btn-primary btn-block" type="submit">
          Login
        </button>
      </form>
      {message && <Message message={message} />}
    </div>
  );
};

export default Login;
