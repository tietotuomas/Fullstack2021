
import Person from "./Person"

const PersonRenderLogic = ({ persons, filter }) => {
    return filter === "" ? (
      <>
        {persons.map((person) => (
          <Person key={person.name} person={person} />
        ))}
      </>
    ) : (
      <>
        {persons
          .filter((person) =>
            person.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((person) => (
            <Person key={person.name} person={person} />
          ))}
      </>
    );
  };

  export default PersonRenderLogic