import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { Dropdown, DropdownCountry, DropdownState } from "./dropdown";

const HomePage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/logout");
  };
  const [userData, setUserData] = useState(null);
  const [weatherData, setWeatherData] = useState("");
  const [dropdownData, setDropdownData] = useState([]);
  const [dropdownDataState, setDropdownDataState] = useState([]);
  const [dropdownDataCity, setDropdownDataCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const [defaultweatherData, setdefaultWeatherData] = useState("");
  const [defaultdropdownDataState, setdefaultDropdownDataState] = useState([]);
  const [defaultdropdownDataCity, setdefaultDropdownDataCity] = useState([]);
  const [selectedDefaultCity, setDefaultSelectedCity] = useState("");
  const [selectedDefaultState, setDefaultSelectedState] = useState("");
  const [selectedDefaultCountry, setDefaultSelectedCountry] = useState("");
  const [defaultLocation, setDefaultLocation] = useState("");

  const [defaultTwoWeatherData, setDefaultTwoWeatherData] = useState("");
  const [defaultTwoDropdownDataState, setDefaultTwoDropdownDataState] =
    useState([]);
  const [defaultTwoDropdownDataCity, setDefaultTwoDropdownDataCity] = useState(
    []
  );
  const [selectedDefaultTwoCity, setDefaultTwoSelectedCity] = useState("");
  const [selectedDefaultTwoState, setDefaultTwoSelectedState] = useState("");
  const [selectedDefaultTwoCountry, setDefaultTwoSelectedCountry] =
    useState("");
  const [defaultTwoLocation, setDefaultTwoLocation] = useState("");

  const [defaultThreeWeatherData, setDefaultThreeWeatherData] = useState("");
  const [defaultThreeDropdownDataState, setDefaultThreeDropdownDataState] =
    useState([]);
  const [defaultThreeDropdownDataCity, setDefaultThreeDropdownDataCity] =
    useState([]);
  const [selectedDefaultThreeCity, setDefaultThreeSelectedCity] = useState("");
  const [selectedDefaultThreeState, setDefaultThreeSelectedState] =
    useState("");
  const [selectedDefaultThreeCountry, setDefaultThreeSelectedCountry] =
    useState("");
  const [defaultThreeLocation, setDefaultThreeLocation] = useState("");

  const [defaultFourWeatherData, setDefaultFourWeatherData] = useState("");
  const [defaultFourDropdownDataState, setDefaultFourDropdownDataState] =
    useState([]);
  const [defaultFourDropdownDataCity, setDefaultFourDropdownDataCity] =
    useState([]);
  const [selectedDefaultFourCity, setDefaultFourSelectedCity] = useState("");
  const [selectedDefaultFourState, setDefaultFourSelectedState] = useState("");
  const [selectedDefaultFourCountry, setDefaultFourSelectedCountry] =
    useState("");
  const [defaultFourLocation, setDefaultFourLocation] = useState("");

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

  const fetchdefaultlocationWeatherData = async (loc, preferredLocation) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/getweatherdata",
        {
          city: loc.city,
          state: loc.state,
          country: loc.country,
        }
      );

      switch (preferredLocation) {
        case "defaultLocation":
          setdefaultWeatherData(response.data);
          break;
        case "defaultLocationTwo":
          setDefaultTwoWeatherData(response.data);
          break;
        case "defaultLocationThree":
          setDefaultThreeWeatherData(response.data);
          break;
        case "defaultLocationFour":
          setDefaultFourWeatherData(response.data);
          break;
        default:
          console.log("none");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDropdownCountry = async () => {
    try {
      const response = await axios.get("http://localhost:5000/dropdowndata");
      setDropdownData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDropdownState = async (sC, preferredLocation) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/dropdowndatastate",
        {
          country: sC,
        }
      );

      switch (preferredLocation) {
        case "defaultLocation":
          setdefaultDropdownDataState(response.data);
          break;
        case "defaultLocationTwo":
          setDefaultTwoDropdownDataState(response.data);
          break;
        case "defaultLocationThree":
          setDefaultThreeDropdownDataState(response.data);
          break;
        case "defaultLocationFour":
          setDefaultFourDropdownDataState(response.data);
          break;
        case "selected":
          setDropdownDataState(response.data);
          break;
        default:
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDropdownCity = async (sC, selcountry, preferredLocation) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/dropdowndatacity",
        {
          state: sC,
          country: selcountry,
        }
      );
      switch (preferredLocation) {
        case "defaultLocation":
          setdefaultDropdownDataCity(response.data);
          break;
        case "defaultLocationTwo":
          setDefaultTwoDropdownDataCity(response.data);
          break;
        case "defaultLocationThree":
          setDefaultThreeDropdownDataCity(response.data);
          break;
        case "defaultLocationFour":
          setDefaultFourDropdownDataCity(response.data);
          break;
        case "selected":
          setDropdownDataCity(response.data);
          break;
        default:
          console.log("none");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDropdownCountry();
    fetchDefaultLocation();
    fetchDefaultLocationTwo();
    fetchDefaultLocationThree();
    fetchDefaultLocationFour();
  }, []);

  const updateDefaultLocation = async () => {
    try {
      await axios.post("http://localhost:5000/updatedefaultlocation", {
        // default_location: `${sdc},${sds},${sdco}`,
        default_location: `${selectedDefaultCity}, ${selectedDefaultState}, ${selectedDefaultCountry}`,
        username: localStorage.getItem("username"),
      });
      console.log("Default location updated successfully");
      fetchDefaultLocation();
    } catch (error) {
      console.error("Error updating default location:", error);
    }
  };

  const fetchDefaultLocation = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/getdefaultlocation",
        {
          username: localStorage.getItem("username"),
        }
      );
      setDefaultLocation(response.data.default_location);
      fetchdefaultlocationWeatherData(
        response.data.default_location,
        "defaultLocation"
      );
    } catch (error) {
      console.error("Error fetching default location:", error);
    }
  };

  const fetchDefaultLocationTwo = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/getdefaultlocationtwo",
        {
          username: localStorage.getItem("username"),
        }
      );
      setDefaultTwoLocation(response.data.default_location);
      fetchdefaultlocationWeatherData(
        response.data.default_location,
        "defaultLocationTwo"
      );
    } catch (error) {
      console.error("Error fetching default location:", error);
    }
  };
  const updateDefaultLocationTwo = async () => {
    try {
      await axios.post("http://localhost:5000/updatedefaultlocationtwo", {
        // default_location: `${sdc},${sds},${sdco}`,
        default_location: `${selectedDefaultTwoCity}, ${selectedDefaultTwoState}, ${selectedDefaultTwoCountry}`,
        username: localStorage.getItem("username"),
      });
      console.log("Default location updated successfully");
      fetchDefaultLocationTwo();
    } catch (error) {
      console.error("Error updating default location:", error);
    }
  };

  const fetchDefaultLocationThree = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/getdefaultlocationthree",
        {
          username: localStorage.getItem("username"),
        }
      );
      setDefaultThreeLocation(response.data.default_location);
      fetchdefaultlocationWeatherData(
        response.data.default_location,
        "defaultLocationThree"
      );
    } catch (error) {
      console.error("Error fetching default location:", error);
    }
  };
  const updateDefaultLocationThree = async () => {
    try {
      await axios.post("http://localhost:5000/updatedefaultlocationthree", {
        // default_location: `${sdc},${sds},${sdco}`,
        default_location: `${selectedDefaultThreeCity}, ${selectedDefaultThreeState}, ${selectedDefaultThreeCountry}`,
        username: localStorage.getItem("username"),
      });
      console.log("Default location updated successfully");
      fetchDefaultLocationThree();
    } catch (error) {
      console.error("Error updating default location:", error);
    }
  };

  const fetchDefaultLocationFour = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/getdefaultlocationfour",
        {
          username: localStorage.getItem("username"),
        }
      );
      setDefaultFourLocation(response.data.default_location);
      fetchdefaultlocationWeatherData(
        response.data.default_location,
        "defaultLocationFour"
      );
    } catch (error) {
      console.error("Error fetching default location:", error);
    }
  };

  const updateDefaultLocationFour = async () => {
    try {
      await axios.post("http://localhost:5000/updatedefaultlocationfour", {
        default_location: `${selectedDefaultFourCity}, ${selectedDefaultFourState}, ${selectedDefaultFourCountry}`,
        username: localStorage.getItem("username"),
      });
      console.log("Default location updated successfully");
      fetchDefaultLocationFour();
    } catch (error) {
      console.error("Error updating default location:", error);
    }
  };

  const deleteDefaultLocation = async (loc) => {
    try {
      await axios.post("http://localhost:5000/deletedefaultlocation", {
        default_location: `, ,`,
        username: localStorage.getItem("username"),
        loc: loc,
      });
      console.log("Default location updated successfully");
    } catch (error) {
      console.error("Error updating default location:", error);
    }
  };

  return (
    <div className="page-container-home">
      <div className="heading">
        <h2>Welcome, {localStorage.username}!</h2>
      </div>
      <div className="dropdown">
        <h3>Select a location to get the weather forekast</h3>
        <DropdownCountry
          options={dropdownData}
          onChange={(selecteddropdownCountry) => {
            fetchDropdownState(selecteddropdownCountry, "selected");
            setSelectedCountry(selecteddropdownCountry);
          }}
          defaultValue="Select a country"
        />
        <DropdownState
          options={dropdownDataState}
          onChange={(selecteddropdownState) => {
            fetchDropdownCity(
              selecteddropdownState,
              selectedCountry,
              "selected"
            );
            setSelectedState(selecteddropdownState);
          }}
          defaultValue="Select a State"
        />
        <Dropdown
          options={dropdownDataCity}
          onChange={setSelectedCity}
          defaultValue="Select a city"
        />
      </div>
      {selectedCity && (
        <button className="weather-button" onClick={fetchWeatherData}>
          Fetch Weather
        </button>
      )}
      {weatherData && (
        <div className="selected-weather-container">
          {weatherData && (
            <div>
              <h3>
                Weather Information of {selectedCity},{selectedState},
                {selectedCountry}
              </h3>
              <p>Description: {weatherData.description}</p>
              <p>Temperature: {weatherData.temps.temp}F</p>
              <p>Feels Like: {weatherData.temps.feels_like}F</p>
              <p>Max Temp: {weatherData.temps.temp_max}F</p>
              <p>Min Temp: {weatherData.temps.temp_min}F</p>
              <p>Wind Speed: {weatherData.wind.speed}mph</p>
            </div>
          )}
        </div>
      )}
      <div className="default-weather-container">
        <h3>Set or update your preferred location one</h3>

        {defaultweatherData && (
          <div>
            <h3>
              {defaultLocation.city},{defaultLocation.state},
              {defaultLocation.country}
            </h3>
            <p>Description: {defaultweatherData.description}</p>
            <p>Temperature: {defaultweatherData.temps.temp}F</p>
            <p>Feels Like: {defaultweatherData.temps.feels_like}F</p>
            <p>Max Temp: {defaultweatherData.temps.temp_max}F</p>
            <p>Min Temp: {defaultweatherData.temps.temp_min}F</p>
            <p>Wind Speed: {defaultweatherData.wind.speed}mph</p>
          </div>
        )}
        <div className="defaultdropdown">
          <DropdownCountry
            options={dropdownData}
            onChange={(dropdownCountry) => {
              fetchDropdownState(dropdownCountry, "defaultLocation");
              setDefaultSelectedCountry(dropdownCountry);
            }}
            defaultValue="Select a country"
          />
          <DropdownState
            options={defaultdropdownDataState}
            onChange={(dropdownState) => {
              fetchDropdownCity(
                dropdownState,
                selectedDefaultCountry,
                "defaultLocation"
              );
              setDefaultSelectedState(dropdownState);
            }}
            defaultValue="Select a State"
          />
          <Dropdown
            options={defaultdropdownDataCity}
            onChange={setDefaultSelectedCity}
            defaultValue="Select a city"
          />
        </div>
        <button
          className="update-location-button"
          onClick={updateDefaultLocation}
        >
          Add or update default location
        </button>
        <button
          className="delete-button"
          onClick={() => deleteDefaultLocation("one")}
        >
          Delete default location
        </button>
      </div>
      {/* #################################Defaultlocationtwo######################################## */}
      <div className="default-weather-containertwo">
        <h3>Set or update your preferred location two</h3>
        {defaultTwoWeatherData && (
          <div>
            <h3>
              {defaultTwoLocation.city},{defaultTwoLocation.state},
              {defaultTwoLocation.country}
            </h3>
            <p>Description: {defaultTwoWeatherData.description}</p>
            <p>Temperature: {defaultTwoWeatherData.temps.temp}F</p>
            <p>Feels Like: {defaultTwoWeatherData.temps.feels_like}F</p>
            <p>Max Temp: {defaultTwoWeatherData.temps.temp_max}F</p>
            <p>Min Temp: {defaultTwoWeatherData.temps.temp_min}F</p>
            <p>Wind Speed: {defaultTwoWeatherData.wind.speed}mph</p>
          </div>
        )}
        <div className="defaultdropdowntwo">
          <DropdownCountry
            options={dropdownData}
            onChange={(dropdownCountry) => {
              fetchDropdownState(dropdownCountry, "defaultLocationTwo");
              setDefaultTwoSelectedCountry(dropdownCountry);
            }}
            defaultValue="Select a country"
          />
          <DropdownState
            options={defaultTwoDropdownDataState}
            onChange={(dropdownState) => {
              fetchDropdownCity(
                dropdownState,
                selectedDefaultTwoCountry,
                "defaultLocationTwo"
              );
              setDefaultTwoSelectedState(dropdownState);
            }}
            defaultValue="Select a State"
          />
          <Dropdown
            options={defaultTwoDropdownDataCity}
            onChange={setDefaultTwoSelectedCity}
            defaultValue="Select a city"
          />
        </div>
        <button
          className="update-location-button"
          onClick={updateDefaultLocationTwo}
        >
          Add or update default location
        </button>
        <button
          className="delete-button"
          onClick={() => deleteDefaultLocation("two")}
        >
          Delete default location
        </button>
      </div>

      {/* ###############Defaultlocationthree############# */}
      <div className="default-weather-containerthree">
        <h3>Set or update your preferred location three</h3>
        {defaultThreeWeatherData && (
          <div>
            <h3>
              {defaultThreeLocation.city},{defaultThreeLocation.state},
              {defaultThreeLocation.country}
            </h3>
            <p>Description: {defaultThreeWeatherData.description}</p>
            <p>Temperature: {defaultThreeWeatherData.temps.temp}F</p>
            <p>Feels Like: {defaultThreeWeatherData.temps.feels_like}F</p>
            <p>Max Temp: {defaultThreeWeatherData.temps.temp_max}F</p>
            <p>Min Temp: {defaultThreeWeatherData.temps.temp_min}F</p>
            <p>Wind Speed: {defaultThreeWeatherData.wind.speed}mph</p>
          </div>
        )}
        <div className="defaultdropdowntwo">
          <DropdownCountry
            options={dropdownData}
            onChange={(dropdownCountry) => {
              fetchDropdownState(dropdownCountry, "defaultLocationThree");
              setDefaultThreeSelectedCountry(dropdownCountry);
            }}
            defaultValue="Select a country"
          />
          <DropdownState
            options={defaultThreeDropdownDataState}
            onChange={(dropdownState) => {
              fetchDropdownCity(
                dropdownState,
                selectedDefaultThreeCountry,
                "defaultLocationThree"
              );
              setDefaultThreeSelectedState(dropdownState);
            }}
            defaultValue="Select a State"
          />
          <Dropdown
            options={defaultThreeDropdownDataCity}
            onChange={setDefaultThreeSelectedCity}
            defaultValue="Select a city"
          />
        </div>
        <button
          className="update-location-button"
          onClick={updateDefaultLocationThree}
        >
          Add or update default location
        </button>
        <button
          className="delete-button"
          onClick={() => deleteDefaultLocation("three")}
        >
          Delete default location
        </button>
      </div>

      {/* ###############Defaultlocationfour############# */}
      <div className="default-weather-containerfour">
        <h3>Set or update your preferred location four</h3>
        {defaultFourWeatherData && (
          <div>
            <h3>
              {defaultFourLocation.city},{defaultFourLocation.state},
              {defaultFourLocation.country}
            </h3>
            <p>Description: {defaultFourWeatherData.description}</p>
            <p>Temperature: {defaultFourWeatherData.temps.temp}F</p>
            <p>Feels Like: {defaultFourWeatherData.temps.feels_like}F</p>
            <p>Max Temp: {defaultFourWeatherData.temps.temp_max}F</p>
            <p>Min Temp: {defaultFourWeatherData.temps.temp_min}F</p>
            <p>Wind Speed: {defaultFourWeatherData.wind.speed}mph</p>
          </div>
        )}
        <div className="defaultdropdowntwo">
          <DropdownCountry
            options={dropdownData}
            onChange={(dropdownCountry) => {
              fetchDropdownState(dropdownCountry, "defaultLocationFour");
              setDefaultFourSelectedCountry(dropdownCountry);
            }}
            defaultValue="Select a country"
          />
          <DropdownState
            options={defaultFourDropdownDataState}
            onChange={(dropdownState) => {
              fetchDropdownCity(
                dropdownState,
                selectedDefaultFourCountry,
                "defaultLocationFour"
              );
              setDefaultFourSelectedState(dropdownState);
            }}
            defaultValue="Select a State"
          />
          <Dropdown
            options={defaultFourDropdownDataCity}
            onChange={setDefaultFourSelectedCity}
            defaultValue="Select a city"
          />
        </div>
        <button
          className="update-location-button"
          onClick={updateDefaultLocationFour}
        >
          Add or update default location
        </button>
        <button
          className="delete-button"
          onClick={() => deleteDefaultLocation("four")}
        >
          Delete default location
        </button>
      </div>

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default HomePage;
