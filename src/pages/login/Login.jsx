import React from "react";
import axios from "axios";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post("/auth/login", credentials);

      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not an admin" },
        });
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-form">
          <h1>Admin</h1>

          <form>
            <input
              className="login-input"
              type="text"
              placeholder="Username"
              id="username"
              onChange={handleChange}
            />

            <input
              className="login-input"
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
            />

            <button className="login-button" disabled={loading} onClick={handleClick}>
              Login
            </button>

            {error && <span className="error-message">{error.message}</span>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
