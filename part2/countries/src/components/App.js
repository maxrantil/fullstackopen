import { useState, useEffect } from 'react';
import axios from 'axios';
import CountryDetails from './CountryDetails';

const Filter = ({ filter, handleFilterChange }) => {
	return (
		<div>
			find countries <input value={filter} onChange={handleFilterChange} />
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

const fetchCountries = async () => {
	const response = await axios.get('https://restcountries.com/v3.1/all');
	return response.data;
};

const App = () => {
	const [countries, setCountries] = useState([]);
	const [filter, setFilter] = useState('');
	const [selectedCountry, setSelectedCountry] = useState(null);

	useEffect(() => {
		const loadCountries = async () => {
			const loadedCountries = await fetchCountries();
			setCountries(loadedCountries);
		};
		loadCountries();
	}, []);

	const handleFilterChange = (event) => {
		setFilter(event.target.value);
		setSelectedCountry(null);
	};

	const handleShowClick = (country) => {
		setSelectedCountry(country);
	};

	const countriesToShow = selectedCountry
		? [selectedCountry]
		: filter
			? countries.filter((country) =>
				country.name.common &&
				typeof country.name.common === 'string' &&
				country.name.common.toLowerCase().includes(filter.toLowerCase())
			)
			: [];

	console.log('countriesToShow:', countriesToShow);
	console.log('selectedCountry:', selectedCountry);

	console.log('countriesToShow:', countriesToShow);
	console.log('selectedCountry:', selectedCountry);
	return (
		<div>
			<Filter filter={filter} handleFilterChange={handleFilterChange} />
			<ShowCountries countries={countriesToShow} handleShowClick={handleShowClick} filter={filter} />
		</div>
	);
};

export default App;
