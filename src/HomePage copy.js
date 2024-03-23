import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/logout");
  };
  const [userData, setUserData] = useState(null);
  const [weatherData, setWeatherData] = useState(""); // State to store weather data
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/protected", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error(error.response.data);
        window.location.href = "http://localhost:3000/login";
      }
    };

    fetchData();
  }, []);

  // Function to fetch weather data
  const fetchWeatherData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/getweatherdata",
        {
          city: "Fairfield",
          state: "CT",
          country: "US",
        }
      );
      console.log(response.data);
      setWeatherData(response.data);
    } catch (error) {
      setError("Error fetching weather data");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Welcome, {localStorage.username}!</h2>
      <p>This is your personalized welcome page.</p>

      {/* Button to fetch weather data */}
      <button onClick={fetchWeatherData}>Fetch Weather</button>

      {/* Display weather data if available */}
      {weatherData && (
        <div>
          <h3>Weather Information of FairField, CT, US</h3>
          <p>Description: {weatherData.description}</p>
          <p>Temperature: {weatherData.temps.temp}F</p>
          <p>Feels Like: {weatherData.temps.feels_like}F</p>
          <p>Max Temp: {weatherData.temps.temp_max}F</p>
          <p>Min Temp: {weatherData.temps.temp_min}F</p>
          <p>Wind Speed: {weatherData.wind.speed}mph</p>
        </div>
      )}

      {/* Add a logout button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
