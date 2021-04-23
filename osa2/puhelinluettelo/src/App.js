import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterField from "./components/FilterField";
import NewForm from "./components/NewForm";
import PersonRenderLogic from "./components/PersonRenderLogic";
import { computeHeadingLevel } from "@testing-library/dom";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.map((person) => person.name).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const person = { name: newName, number: newNumber };
      setPersons(persons.concat(person));
      setNewName("");
      setNewNumber("");
    }
  };

  useEffect(() => {
    console.log("useEffect pörrää");
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterField filter={filter} handleFilter={handleFilter} />

      <h3>Add a new</h3>
      <NewForm
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />

      <h3>Numbers</h3>
      <PersonRenderLogic persons={persons} filter={filter} />
    </div>
  );
};

export default App;
