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
//currentWeather('Netherlands');

//createServer
// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World!');
// });

appe.use(express.static(path.join(__dirname, 'public')));

appe.get('/data.json', (req, res) => {
    
    fs.readFile('data.json', (err, data) => {
        if (err){
            res.status(500).send('Error reading json file');
            return;
        }
        const jsonData = JSON.parse(data);
        res.json(jsonData);
    });
})

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