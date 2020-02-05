import axios from 'axios';

class PropertyService {
    
    getCarsSmall() {
        return  fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(json => console.log(json))

       
    }

    getCarsMedium() {
        return axios.get('https://jsonplaceholder.typicode.com/users')
                .then(res => res.data.data);
    }

    getCarsLarge() {
        return axios.get('https://jsonplaceholder.typicode.com/users')
                .then(res => res.data.data);
    }
}

export default PropertyService;
