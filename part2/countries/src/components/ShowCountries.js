import { useState, useEffect } from 'react';
import axios from 'axios';

const CountryDetails = ({ country }) => {
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		axios
			.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_API_KEY}`)
			.then(response => {
				const weatherData = response.data;
				const icon = weatherData.weather[0].icon;
				const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
				setWeather({
					...weatherData,
					temperature: weatherData.main.temp,
					wind: weatherData.wind.speed,
					icon: iconUrl
				});
			})
			.catch(error => {
				console.log('error', error);
			});
	}, [country]);

	return (
		<div>
			<h1>{country.name.official}</h1>
			<div>capital: <b>{country.capital}</b></div>
			<div>population: {country.population.toLocaleString()}</div>
			{country.currencies && typeof country.currencies === 'object' ?
				Object.entries(country.currencies).map(([code, currency], i) => (
					<div key={i}>currency: {currency.name} ({code}) - {currency.symbol}</div>
				))
				:
				<li>No currency available</li>
			}
			<div>region: {country.region}</div>
			<h2>languages</h2>
			<ul>
				{Object.values(country.languages).map((language, i) => <li key={i}>{language}</li>)}
			</ul>
			<img src={country.flags.png} alt={country.name.common} width="100" />
			{weather && (
				<div className="weather">
					<h3>Weather in {country.capital}</h3>
					<p><strong>{weather.weather[0].main}</strong> / {weather.weather[0].description}</p>
					<div>Temperature: {(weather.temperature - 273.15).toFixed(1)} °C</div>
					<img className="weatherIcon" src={weather.icon} alt="weather icon" />
					<div>Wind: {weather.wind} m/s</div>
				</div>
			)}
		</div>
	);
};

const ShowCountries = ({ countries, handleShowClick, filter }) => {
	if (countries.length > 10) {
		return <div>Too many matches, specify another filter</div>;
	}

	if (countries.length === 1) {
		return <CountryDetails country={countries[0]} />;
	}

	if (countries.length === 0 && filter) {
		return <div>No matches found</div>;
	}

	return (
		<div>
			{countries.map((country) => (
				<div key={country.name.common}>
					{country.name.common} <button onClick={() => handleShowClick(country)}>Show</button>
				</div>
			))}
		</div>
	);
};

export default ShowCountries;