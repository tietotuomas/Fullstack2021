import Person from "./Person";

const PersonRenderLogic = ({ persons, filter, setPersons, setMessage, resetMessage }) => {
  return filter === "" ? (
    <>
      {persons.map((person) => (
        <Person
          key={person.name}
          person={person}
          setPersons={setPersons}
          persons={persons}
          setMessage={setMessage}
          resetMessage={resetMessage}
          
        />
      ))}
    </>
  ) : (
    <>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person) => (
          <Person
            key={person.name}
            person={person}
            setPersons={setPersons}
            persons={persons}
            setMessage={setMessage}
            resetMessage={resetMessage}
          />
        ))}
    </>
  );
};

export default PersonRenderLogic;
