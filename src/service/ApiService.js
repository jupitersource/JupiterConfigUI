import axios from 'axios';

export class ApiService {
   
    getSampleData() {
        return  fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())

    }

}