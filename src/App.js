import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";
import WelcomePage from "./WelcomePage";
import HomePage from "./HomePage";
import LogoutPage from "./LogoutPage";
import LoginHelpForm from "./LoginHelp";
import OTPForm from "./handleotp";
import OTPFormLoginHelp from "./handleotploginhelp";

const HandleRedirect = (path) => {
  const navigate = useNavigate();
  navigate(path);
  console.log("inside handle redirect");
};

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token; // Returns true if token has a value, false otherwise
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/loginhelp" element={<LoginHelpForm />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/handleotp" element={<OTPForm />} />
          <Route path="/handleotploginhelp" element={<OTPFormLoginHelp />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
