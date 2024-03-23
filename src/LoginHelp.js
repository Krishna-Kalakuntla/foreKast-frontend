import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import generateOTP from "./OtpGenerator";
import "./LoginHelp.css";

// import { storeUsername } from "./UserNameStore";

const LoginHelpForm = () => {
  const [useremail, setUseremail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const navigate = useNavigate();
  const otp = generateOTP();

  const handleRedirect = (path) => {
    navigate(path);
  };

  const handleLoginHelp = async () => {
    try {
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
        useremail,
        password,
        otp,
      });
      localStorage.setItem("user_data", user_data);
      const response = await fetch("http://localhost:5000/sendotpemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ useremail, password, otp }),
      });
      handleRedirect("/handleotploginhelp");
      // if (response.status === 200) {
      //   handleRedirect("/login");
      // } else {
      //   handleRedirect("/loginpage");
      // }
      //   const data = await response.json();
    } catch (e) {
      console.error("An error occurred during password update", e);
    }
  };

  return (
    <div className="page-container">
      <div className="login-form">
        <h2>Changepassword</h2>
        <input
          type="text"
          placeholder="UserEmail"
          onChange={(e) => setUseremail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Reenter Password"
          onChange={(e) => setconfirmPassword(e.target.value)}
        />
        <button onClick={handleLoginHelp}>ChangePassword</button>
      </div>
    </div>
  );
};

export default LoginHelpForm;
