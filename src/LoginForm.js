import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
// import { storeUsername } from "./UserNameStore";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRedirect = (path) => {
    navigate(path);
    console.log("inside handle redirect");
  };

  const handleRedirectLoginHelp = () => {
    handleRedirect("/loginhelp");
  };
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log(data);
      if (data.login === "true") {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("username", username);
        console.log(localStorage);
        // storeUsername(username);
        handleRedirect("/homepage");
        setTimeout(() => {
          localStorage.removeItem("token");
          console.log("Token removed from local storage.");
        }, 3600 * 1000);
      } else {
        console.log("Login failed. Please check your credentials.");
      }
    } catch (e) {
      console.error("An error occurred during login:", e);
    }
  };

  return (
    <div className="page-container">
      <div className="login-form">
        <h2>Login</h2>
        <input
          className="input-field"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        <button
          className="forgot-password-button"
          onClick={handleRedirectLoginHelp}
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
