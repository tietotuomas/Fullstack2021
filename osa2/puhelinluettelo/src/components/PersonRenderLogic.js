import Person from "./Person";

const PersonRenderLogic = ({ persons, filter, handleDelete }) => {
  return filter === "" ? (
    <>
      {persons.map((person) => (
        <Person key={person.name} person={person} handleDelete={handleDelete} />
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
            handleDelete={handleDelete}
          />
        ))}
    </>
  );
};

export default PersonRenderLogic;
