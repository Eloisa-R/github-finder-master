const fetch = require('node-fetch');
const fs = require('fs');

const TOKEN = 'cdfd11da3a5b339232211ced49f860aa1d3cd96d';

fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `token ${TOKEN}`, },
    body: JSON.stringify({
        variables: {},
        query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
    }),
})
    .then(result => result.json())
    .then(result => {
        // here we're filtering out any type information unrelated to unions or interfaces
        const filteredData = result.data.__schema.types.filter(
            type => type.possibleTypes !== null,
        );
        result.data.__schema.types = filteredData;
        fs.writeFile('./src/fragmentTypes.json', JSON.stringify(result.data), err => {
            if (err) {
                console.error('Error writing fragmentTypes file', err);
            } else {
                console.log('Fragment types successfully extracted!');
            }
        });
    });