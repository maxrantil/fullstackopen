import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const ShowCountries = ({ countries, filter }) => {

  console.log('in ShowCountries:', countries);

  if (filter && countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }

  if (countries.length === 1) {
    const country = countries[0]
    return (
      <div>
        <h1>{country.name.common}</h1>
        <h3>{country.name.official}</h3>
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
      </div>
    )
  }

  console.log('inside countries:', countries);
  return (
    <div>
      {countries.map(country => <div key={country.name.common}>{country.name.common}</div>)}
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('countries loaded:', response);
        const filteredCountries = response.data.filter(country => country.name.common.toLowerCase().startsWith(filter.toLowerCase()))
        setCountries(filteredCountries)
      })
  }, [filter])

  const handleFilterChange = (event) => {
    console.log('filter change event:', event.target.value);
    setFilter(event.target.value)
  }

  const countriesToShow = filter
    ? countries.filter(country => country.name.common && typeof country.name.common === 'string' && country.name.common.toLowerCase().startsWith(filter.toLowerCase()))
    : []


  console.log('out countriesToShow:', countriesToShow);

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <ShowCountries countries={countriesToShow} filter={filter}/>
    </div>
  );
}

export default App;
