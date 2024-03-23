import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import generateOTP from "./OtpGenerator";
import "./RegistrationForm.css";

const RegistrationForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleRedirect = (path) => {
    navigate(path, { replace: true });
  };
  const otp = generateOTP();
  const handleRegister = async () => {
    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    // Basic password validation
    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const user_data = JSON.stringify({
      firstname,
      lastname,
      username,
      password,
      email,
      otp,
    });
    localStorage.setItem("user_data", user_data);
    const response = await fetch("http://localhost:5000/sendotpemail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });
    handleRedirect("/handleotp");
    // const response = await fetch("http://localhost:5000/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     firstname,
    //     lastname,
    //     username,
    //     password,
    //     email,
    //     otp,
    //   }),
    // });
    // const data = await response.json();
    setTimeout(() => {
      localStorage.removeItem("otp");
      console.log("otp removed from local storage.");
    }, 5 * 60 * 1000);
  };

  return (
    <div className="page-container">
      <div className="registration-form">
        <h2>
          Ready to check your favourite location's weather? Enter your details
          to create your own account.
        </h2>
        <input
          className="input-field"
          type="text"
          placeholder="Firstname"
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          className="input-field"
          type="text"
          placeholder="Lastname"
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          className="input-field"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input-field"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="input-field"
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="register-button" onClick={handleRegister}>
          Register
        </button>
        <h5>
          Already registered?
          <button
            className="login-button"
            onClick={() => handleRedirect("/login")}
          >
            Login
          </button>
        </h5>
      </div>
    </div>
  );
};

export default RegistrationForm;
