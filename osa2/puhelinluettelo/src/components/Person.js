import httpService from "../services/httpService";

const Person = ({ person, setPersons, persons, setMessage, resetMessage }) => {
  const handleClick = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      httpService.remove(person.id);
      const newPersons = persons.filter(
        (personToBeAdded) => personToBeAdded.id !== person.id
      );

      const newMessage = { message: `Deleted ${person.name}`, error: false };
      setPersons(newPersons);
      setMessage(newMessage);
      resetMessage();
    }
  };
  return (
    <>
      <p>
        {person.name} {person.number}{" "}
        <button onClick={handleClick}>delete</button>
      </p>
    </>
  );
};

export default Person;
