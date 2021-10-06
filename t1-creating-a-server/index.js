const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
  // Set HTTP Response as 200 OK
  res.statusCode = 200;

  // Set HTTP Headers, this defines the type of content we will send
  res.setHeader('Content-Type', 'text/html');

  // Writing a response
  res.write('<h1>Hello World!</h1>');

  // Ending the response process
  res.end();
});

server.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);
