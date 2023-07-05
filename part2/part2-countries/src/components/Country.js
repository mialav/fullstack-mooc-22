import { useState, useEffect } from "react";

const Country = ({ country }) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
  const [capitalWeather, setCapitalWeather] = useState([]);

  const getCapitalWeather = async () => {
    const response = await fetch(weatherUrl);
    const jsonData = await response.json();
    setCapitalWeather(jsonData);
  };

  useEffect(() => {
    getCapitalWeather();
  }, []);

  console.log(capitalWeather);
  console.log("main", capitalWeather.weather && capitalWeather.weather[0]);
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
        {capitalWeather && (
          <div>
            <h2>Weather in {country.capital[0]}</h2>
            <div>
              <p>temperature {capitalWeather?.main?.temp} Celsius</p>
              {capitalWeather.weather && (
                <img
                  src={`https://openweathermap.org/img/wn/${capitalWeather?.weather[0]?.icon}@2x.png`}
                />
              )}
              {capitalWeather.wind && (
                <p>wind {capitalWeather?.wind.speed} m/s</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Country;
