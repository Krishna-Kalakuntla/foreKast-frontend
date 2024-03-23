import React, { useState } from "react";
import axios from "axios";
const WeatherComponent = ({ selectedCity, selectedState, selectedCountry }) => {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/getweatherdata",
        {
          city: selectedCity,
          state: selectedState,
          country: selectedCountry,
        }
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
};

export default WeatherComponent;
