import axios from 'axios';

export class ApiService {
   
    

    getSampleData() {
        return  fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
    }

    getAllTemplatesData() {
        return  fetch('https://zupiterfunctionapp.azurewebsites.net/api/projects/b7f91689-e274-46f4-807d-71b305d56dc6/deviceTemplates')
        .then(response => response.data);
    }
   
    async makeGetRequest() {
        try {
    let res = await axios.get(
        'https://zupiterfunctionapp.azurewebsites.net/api/projects/b7f91689-e274-46f4-807d-71b305d56dc6/deviceTemplates');

    let data = res.data;
    console.log(data);
    return await res.data;
        }
         catch (err) {
            console.error(err);
            return null;
        }
    }

    async fetchTransformAttributes() {
        try {
    let res = await axios.get(
        'https://zupiterfunctionapp.azurewebsites.net/api/projects/b7f91689-e274-46f4-807d-71b305d56dc6/deviceTemplates/db345eb0-c633-43cc-8b3f-10e8595fb07e/transformAttributes');

    let data = res.data;
    console.log(data);
    return await res.data;
        }
         catch (err) {
            console.error(err);
            return null;
        }
    }

    async saveTemplateInfo(name, desc) {
      
    let res = await axios.post('https://zupiterfunctionapp.azurewebsites.net/api/projects/b7f91689-e274-46f4-807d-71b305d56dc6/deviceTemplates',
     {
            name: name,
            description: desc        
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log(res);
    }

    async savePropertyInfo(tempaleName, key, value, isOverride) {
      
        let res = await axios.post('https://zupiterfunctionapp.azurewebsites.net/api/projects/b7f91689-e274-46f4-807d-71b305d56dc6/deviceTemplates',
         {
                name: "template 111",
                description: "template desc 111",
                properties: [{
                        key: key,
                        value: value,
                        isOverride: isOverride
                    }
                ]             
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          console.log(res);
        }

        async saveDeviceAttrInfo(tempaleName, name, desc,dataType, initialValue, isMatrices, engUnit,  ext) {
      
            let res = await axios.post('https://zupiterfunctionapp.azurewebsites.net/api/projects/b7f91689-e274-46f4-807d-71b305d56dc6/deviceTemplates',
             {
                    name: "template 111",
                    description: "template desc 111",
                    deviceAttributes: [{
                        name: name,
                        description: desc,
                        isMetric: isMatrices,
                        dataType: dataType,
                        initialValue: initialValue,
                        engUnit: engUnit
                        
                        }
                    ]             
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
              console.log(res);
            }

            async saveTransformAttrInfo(tempaleName, name, desc,dataType, initialValue, isMatrices, engUnit,  ext, formula) {
      
              let res = await axios.post('https://zupiterfunctionapp.azurewebsites.net/api/projects/b7f91689-e274-46f4-807d-71b305d56dc6/deviceTemplates',
               {
                id: "6052a951-2e43-4015-ad15-a1b668db4e09",
                      transformAttributes: [{
                          name: name,
                          description: desc,
                          isMetric: isMatrices,
                          dataType: dataType,
                          formula: formula,
                          engUnit: engUnit
                          
                          }
                      ]             
                })
                .then(function (response) {
                  console.log(response);
                })
                .catch(function (error) {
                  console.log(error);
                });
                console.log(res);
              }
            }