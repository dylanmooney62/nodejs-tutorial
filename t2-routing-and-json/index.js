const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

// Read from jokes.json and parse JSON to javascript object
const jokes = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'jokes.json'), 'utf-8')
);

const server = http.createServer((req, res) => {
  // Set HTTP Response as 200 OK
  res.statusCode = 200;

  // Set HTTP Header to application/json
  res.setHeader('Content-Type', 'application/json');

  // Generate number between 0 and the amount of jokes
  const random = Math.floor(Math.random() * jokes.length);

  // Select random joke from data
  const joke = jokes[random];

  // Send joke as response
  res.end(JSON.stringify({ data: joke }));
});

server.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);
