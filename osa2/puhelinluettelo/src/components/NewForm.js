
const NewForm = ({
    newName,
    newNumber,
    handleNewName,
    handleNewPerson,
    handleNewNumber,
  }) => {
    return (
      <>
        <form onSubmit={handleNewPerson}>
          <div>
            name: <input value={newName} onChange={handleNewName} />
          </div>
          <div>
            number: <input value={newNumber} onChange={handleNewNumber} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </>
    );
  };

  export default NewForm