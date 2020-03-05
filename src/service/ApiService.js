import axios from 'axios';

export class ApiService {
   
    getSampleData() {
        return  fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
    }

    getAllTemplatesData() {
        return  fetch('https://zupiterfunctionapp.azurewebsites.net/api/projects/b7f91689-e274-46f4-807d-71b305d56dc6/deviceTemplates')
        .then(response => response.json())
    }
}