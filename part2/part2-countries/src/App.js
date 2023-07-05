import { useState, useEffect } from "react";
import countryService from "./services/countries";
import CountryListItem from "./components/CountryListItem";
import Country from "./components/Country";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [country, setCountry] = useState("");

  useEffect(() => {
    countryService.getAll().then((initialCountries) => {
      setCountries(initialCountries.map((country) => country));
    });
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  const handleCountrySearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // const countriesToShow = showAll ? countries : countries.filter((country) => country.important);

  return (
    <div>
      <span>Find countries</span>
      <input value={searchQuery} onChange={handleCountrySearch} />
      <div>
        {searchQuery === "" ? null : filteredCountries.length > 10 ? (
          <span>Too many matches, specify another filter</span>
        ) : filteredCountries.length > 1 ? (
          <div>
            {filteredCountries.map((country) => (
              <CountryListItem key={country.name.common} country={country} />
            ))}
          </div>
        ) : filteredCountries.length === 1 ? (
          <div>
            {filteredCountries.map((country) => (
              <Country key={country.name.common} country={country} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
