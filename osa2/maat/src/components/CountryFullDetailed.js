import axios from "axios";
import React, { useState, useEffect } from "react";

const CountryFullDetailed = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState({
    data: [
      {
        rh: "not available",
        temp: "not available",
        clouds: "not available",
        wind_spd: "not available",
        weather: {
          icon: "not available",
        },
      },
    ],
  });

  useEffect(() => {
    axios.get("https://api.weatherbit.io/v2.0/current?key=" + api_key + "&city=" +
    country.capital).then((response) => {
      setWeather(response.data);
    });
  }, [api_key, country.capital]);

  return (
    <>
      <h2>{country.name}</h2>
      capital: {country.capital}
      <br></br>
      population: {country.population}
      <br></br>
      <h3>languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img
        src={country.flag}
        width="160"
        height="100"
        alt={"Flag of " + country.name}
      ></img>
      <h3>Weather in {country.capital}</h3>
      <b>Temperature:</b> {weather.data[0].temp}<br></br>
      <b>Cloud coverage (%):</b> {weather.data[0].clouds}<br></br>
      <b>Relative humidity (%):</b> {weather.data[0].rh}<br></br>
      <b>Wind speed (m/s)</b> {weather.data[0].wind_spd}<br></br>
      <img src={window.location.origin + "/img/" + weather.data[0].weather.icon +".png"} alt="Weather icon"></img>
    </>
  );
};

export default CountryFullDetailed;
