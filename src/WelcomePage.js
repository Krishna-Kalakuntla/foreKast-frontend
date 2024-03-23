import React from "react";
import { useNavigate } from "react-router-dom";
import welcomeBg from "./favicon.png";
import "./WelcomePage.css";

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleRedirect = (path) => {
    navigate(path);
  };

  return (
    <div className="page-container">
      <div className="left-half">
        <img src={welcomeBg} alt="Logo" className="logo" />
      </div>
      <div className="right-half">
        <div className="page-content">
          <h2>Welcome to foreKast</h2>
          <button
            className="rounded-button"
            onClick={() => handleRedirect("/login")}
          >
            Login
          </button>
          <button onClick={() => handleRedirect("/register")}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
