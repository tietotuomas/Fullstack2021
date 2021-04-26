import React, { useState, useEffect } from "react";
import httpService from "./services/httpService";
import FilterField from "./components/FilterField";
import NewForm from "./components/NewForm";
import PersonRenderLogic from "./components/PersonRenderLogic";
import Message from "./components/Message";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const emptyMessage = { message: "", error: false };
  const [message, setMessage] = useState(emptyMessage);

  useEffect(() => {
    const promise = httpService.getAll();
    promise.then((database) => {
      setPersons(database);
    });
  }, []);

  const handleNewPerson = (event) => {
    event.preventDefault();

    if (
      persons.find(
        (person) => person.name === newName && person.number === newNumber
      )
    ) {
      alert(`${newName} is already added to phonebook`);
    } else if (persons.map((person) => person.name).includes(newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        handleNumberUpdate();
      }
    } else {
      const person = { name: newName, number: newNumber };
      httpService.create(person).then((personWithId) => {
        setPersons(persons.concat(personWithId));
      });

      personCreated(person);
    }
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleNumberUpdate = () => {
    const personToBeUpdated = persons.find((person) => person.name === newName);
    const updatedPerson = { ...personToBeUpdated, number: newNumber };
    httpService
      .update(updatedPerson.id, updatedPerson)
      .then((response) => {
        setPersons(
          persons.map((person) =>
            person.id !== updatedPerson.id ? person : response
          )
        );
        numberUpdated(updatedPerson);
      })
      .catch((error) => {
        setNewName("");
        setNewNumber("");
        const newMessage = {
          message: `Information of ${newName} has already been removed from the server.`,
          error: true,
        };
        setMessage(newMessage);
        resetMessage();
        const newPersons = persons.filter((person) => person.name !== newName);
        setPersons(newPersons);
      });
  };

  const personCreated = (person) => {
    setNewName("");
    setNewNumber("");
    const newMessage = { message: `Added ${person.name}`, error: false };
    setMessage(newMessage);
    resetMessage();
  };

  const numberUpdated = (updatedPerson) => {
    setNewName("");
    setNewNumber("");
    const newMessage = {
      message: `Updated ${updatedPerson.name}'s number to ${updatedPerson.number}`,
      error: false,
    };
    setMessage(newMessage);
    resetMessage();
  };

  const resetMessage = () => {
    setTimeout(() => setMessage(emptyMessage), [4444]);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} />
      <FilterField filter={filter} handleFilter={handleFilter} />

      <h3>Add a new</h3>
      <NewForm
        newName={newName}
        newNumber={newNumber}
        handleNewPerson={handleNewPerson}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />

      <h3>Numbers</h3>
      <PersonRenderLogic
        persons={persons}
        filter={filter}
        setPersons={setPersons}
        setMessage={setMessage}
        resetMessage={resetMessage}
      />
    </div>
  );
};

export default App;
