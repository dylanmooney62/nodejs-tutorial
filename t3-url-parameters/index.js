const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

// Read from jokes.json and parse JSON to javascript object
const jokes = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'jokes.json'), 'utf-8')
);

const server = http.createServer((req, res) => {
  // Set HTTP Header to application/json
  res.setHeader('Content-Type', 'application/json');

  // If there user doesn't request a specific joke, send a random one
  if (req.url === '/') {
    // Generate number between 0 and the amount of jokes
    const random = Math.floor(Math.random() * jokes.length);

    // Select random joke from data
    const joke = jokes[random];

    // Send joke as response
    return res.writeHead(200).end(JSON.stringify({ data: joke }));
  }

  // Remove slash from path name
  const path = req.url.slice(1);

  // If parameter is not a number, return 400 bad request
  if (isNaN(path)) {
    return res.writeHead(400).end(
      JSON.stringify({
        data: { error: 'Please enter a valid number' },
      })
    );
  }

  // Parse path to number
  const index = parseInt(path, 10);

  // Select joke using index
  const joke = jokes[index];

  // If no joke exists for index, return a 404 message to the client
  if (!joke) {
    return res
      .writeHead(404)
      .end(JSON.stringify({ data: { error: 'No jokes found' } }));
  }

  // Return joke to client
  return res.writeHead(200).end(JSON.stringify(joke));
});

server.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);
