import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./handleotp.css";

const OTPFormLoginHelp = () => {
  const navigate = useNavigate();
  const [otp, setOTP] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const handleRedirect = (path) => {
    navigate(path, { replace: true });
  };
  const handleOTPSubmit = async () => {
    if (otp === localStorage.getItem("otp")) {
      const response = await fetch("http://localhost:5000/loginhelp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: localStorage.getItem("user_data"),
      });

      if (response.ok) {
        localStorage.removeItem("user_data");
        setRegistrationStatus("success");
        setTimeout(() => {
          localStorage.removeItem("otp");
          handleRedirect("/login");
        }, 5000);
      } else {
        setRegistrationStatus("failure");
        localStorage.removeItem("user_data");
        console.error("Registration failed");
        setTimeout(() => {
          localStorage.removeItem("otp");
          handleRedirect("/loginhelp");
        }, 6000);
      }
    } else {
      console.log("otp validation failed");
      setRegistrationStatus("failure");
      localStorage.removeItem("user_data");
      console.error("Registration failed");
      setTimeout(() => {
        localStorage.removeItem("otp");
        handleRedirect("/loginhelp");
      }, 6000);
    }
  };

  return (
    <div className="page-container">
      <div className="otp-form">
        <h3>
          Please enter the OTP sent to your registered email, to verify
          yourself.
        </h3>
        <input
          type="text"
          placeholder="otp"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
        />
        <h5>
          <button onClick={() => handleOTPSubmit()}>VerifyOTP</button>
        </h5>
        {registrationStatus === "success" && (
          <div className="success-message">
            Password change successful!!! redirecting to login page.
          </div>
        )}
        {registrationStatus === "failure" && (
          <div className="failure-message">
            Password change failed!!! Please try again, redirecting to password.
            change page.
          </div>
        )}
      </div>
    </div>
  );
};

export default OTPFormLoginHelp;
