console.log("hello world!");
const http = require('http');
// const app = express();
const server = http.createServer((req, res) => {
    console.log(req.url);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
  });
  
  server.listen(3000, 'localhost', () => {
    console.log('Server running at http://localhost:3000/');
  });
// app.get('/', (req, res) => {

// })