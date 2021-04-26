import CountryName from "./CountryName";
import CountryFullDetailed from "./CountryFullDetailed";

const CountryRenderLogic = ({ filter, countries, setFilter }) => {
  const countriesToRender = countries.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );
  if (filter === "") {
    return <></>;
  } else if (countriesToRender.length > 10) {
    return <>Too many matches, specify another filter</>;
  } else if (countriesToRender.length > 1) {
    return (
      <>
        {countriesToRender.map((country) => (
          <CountryName
            setFilter={setFilter}
            key={country.name}
            name={country.name}
          />
        ))}
      </>
    );
  } else if (countriesToRender.length === 1) {
    return (
      <>
        <CountryFullDetailed country={countriesToRender[0]} />
      </>
    );
  } else {
    return <></>;
  }
};

export default CountryRenderLogic;
