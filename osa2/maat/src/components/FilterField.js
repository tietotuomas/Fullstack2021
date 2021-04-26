const FilterField = ({ handleFilter }) => {
  return (
    <>
      <p>
        find countries
        <input type="text" onChange={handleFilter} />
      </p>
    </>
  );
};

export default FilterField;
