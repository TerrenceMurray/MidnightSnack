import axios from 'axios';

const FORMAT = 'json';
const BASE_URL = `https://maps.googleapis.com/maps/api/geocode/${FORMAT}`;

export const getLatLng = async (address) => {
	const response = await axios.get(
		`${BASE_URL}?address=${address}&key=${
			import.meta.env.VITE_GOOGLE_MAPS_API_KEY
		}`
	);
	return response.data.results;
	// const response = await axios.get(`${BASE_URL}?address=${address}&key=${import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
	// return response.data.results[0].geometry.location;
};
