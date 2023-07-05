const CountryListItem = ({ country, showCountry }) => {
  return (
    <p className="country">
      {country.name.common} <button onClick={showCountry}>show</button>
    </p>
  );
};

export default CountryListItem;
