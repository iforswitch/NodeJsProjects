console.log("Hello from Electron 👋")
const { app, BrowserWindow } = require('electron')
const axios = require('axios');
const express = require('express');
const appe = express();
const http = require('http');
const path = require('path');
const fs = require('fs');

async function currentWeather(query) {
    const access_key = 'hidden';
    const options = {
        method: 'GET'
    }

    try {
        const response = await fetch('http://api.weatherstack.com/current?access_key=' + access_key + '&query=' + query, options);
        const result = await response.json();
        console.log(result);
    }
    catch (error){
        console.error(error);
    }
}
currentWeather('Netherlands');

//createServer
// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World!');
// });

//appe.use(express.static(path.join(__dirname, 'public')));

appe.get('/', (req, res) => {
    
    fs.readFile('data.json', (err, data) => {
        if (err){
            res.status(500).send('Error reading json file');
            return;
        }
        const jsonData = JSON.parse(data);
        res.send(generateHTML(jsonData));
    });
})

function generateHTML(data) {
    let tableRows = '';

    console.log('People Data:', data.people);

    data.people.forEach(person => {
      tableRows += `
        <tr>
          <td>${person.name}</td>
          <td>${person.age}</td>
        </tr>
      `;
    });
  
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Names Table</title>
        <style>
          table {
            width: 50%;
            margin: 20px auto;
            border-collapse: collapse;
          }
          th, td {
            padding: 10px;
            text-align: left;
            border: 1px solid #ddd;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h1>People's Names and Ages</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </body>
      </html>`;
}

appe.listen(3000, 'localhost', () => {
    console.log('Server running at http://localhost:3000');
})

// const createWindow = () => {
//   const win = new BrowserWindow({
//     width: 400,
//     height: 400
//   })

//   win.loadFile('index.html')
// }

// app.whenReady().then(() => {
//   createWindow()
// })