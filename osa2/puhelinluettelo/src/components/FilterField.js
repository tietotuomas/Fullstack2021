
const FilterField = ({ filter, handleFilter }) => {
    return (
      <>
        <p>
          filter shown with
          <input type="text" onChange={handleFilter} />
        </p>
      </>
    );
  };

  export default FilterField