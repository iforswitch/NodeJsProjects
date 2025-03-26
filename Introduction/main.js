console.log("Hello from Electron 👋")
const { app, BrowserWindow } = require('electron')
const axios = require('axios');
const { json } = require('express');

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