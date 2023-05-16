import axios from 'axios'
const baseUrl = 'https://restcountries.com/v3.1/all'

const getAll = () => {
	return axios.get(baseUrl)
	  .then(response => {
		console.log('response data:', response.data);  // Log the response data
		return response.data;
	  })
	  .catch(error => console.error(error));
  }


export default { getAll }