import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterField from "./components/FilterField";
import CountryRenderLogic from "./components/CountryRenderLogic";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div className="App">
      <FilterField handleFilter={handleFilter} />

      <CountryRenderLogic
        filter={filter}
        countries={countries}
        setFilter={setFilter}
      />
    </div>
  );
}

export default App;
