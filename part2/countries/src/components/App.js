import { useState, useEffect } from 'react';
import axios from 'axios';
import ShowCountries from './ShowCountries';
import Filter from './Filter';

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

	return (
		<div>
			<Filter filter={filter} handleFilterChange={handleFilterChange} />
			<ShowCountries countries={countriesToShow} handleShowClick={handleShowClick} filter={filter} />
		</div>
	);
};

export default App;
