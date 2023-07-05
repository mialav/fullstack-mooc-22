const Country = ({ country }) => {
  return (
    <div>
      <h1 className="country">{country.name.common}</h1>
      <div className="info">
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <h2>languages:</h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} />
      </div>
    </div>
  );
};

export default Country;
