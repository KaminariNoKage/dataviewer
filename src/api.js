import axios from 'axios'

// NOTE: Treating as seperate server
// Otherwise, causes a bug where I'd need to change how rest.js parses the url
const URL = 'http://127.0.0.1:3000';

export default {
	getData(cohort, stat){
		return axios.get(`${URL}?cohort=${cohort}&stat=${stat}`);
	}
}