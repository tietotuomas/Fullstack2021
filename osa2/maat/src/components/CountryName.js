const CountryName = ({ name, setFilter }) => {
  return (
    <>
      {name}
      <button onClick={() => setFilter(name)}>show</button>
      <br></br>
    </>
  );
};
export default CountryName;
