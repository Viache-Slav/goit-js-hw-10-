import axios from "axios";
export default axios;

axios.defaults.headers.common["x-api-key"] = 
"live_QJGRZZcM4ssTwmzsOUCkBS067Mx3GJ34fDuZ3vvNM5qXtpyFsGxon25XpCjPOP6A";

const BREEDS_URL = 'https://api.thecatapi.com/v1/breeds';
const CAT_URL = 'https://api.thecatapi.com/v1/images/search';

function fetchBreeds() {
    return axios.get(BREEDS_URL)
    .then(response => response.data)
    .catch(error => Promise.reject(error));
}

function fetchCatByBreed(breedId) {
  const query = `?breed_ids=${breedId}`;
  
  return axios.get(CAT_URL + query)
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

export { fetchBreeds, fetchCatByBreed };


