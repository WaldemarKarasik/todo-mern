import React, { useState, useContext, useRef, useEffect } from "react";
import AuthService from "../Services/AuthService";
import Message from "../Components/Message";

const Register = (props) => {
  const [user, setUser] = useState({ username: "", password: "", role: "" });
  const [message, setMessage] = useState(null);

  let timerID = useRef(null);

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({ username: "", password: "", role: "" });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    AuthService.register(user).then((data) => {
      const { message } = data;
      console.log(message);
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
          props.history.push("/login");
        }, 1000);
      }
    });
  };
  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  return (
    <div>
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <h3 className="text-center">Please Register</h3>
        <label htmlFor="username" className="sr-only">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          name="username"
          value={user.username}
          placeholder="Enter username"
          onChange={(e) => onChangeHandler(e)}
        />
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          value={user.password}
          id="password"
          type="password"
          className="form-control"
          name="password"
          placeholder="Enter password"
          onChange={(e) => onChangeHandler(e)}
        />
        <label htmlFor="role" className="sr-only">
          Password
        </label>
        <input
          type="text"
          value={user.role}
          className="form-control"
          name="role"
          placeholder="Enter role (admin/user)"
          onChange={(e) => onChangeHandler(e)}
        />
        <button className="btn btn-success btn-block" type="submit">
          Register
        </button>
      </form>
      {message && <Message message={message} />}
    </div>
  );
};

export default Register;
