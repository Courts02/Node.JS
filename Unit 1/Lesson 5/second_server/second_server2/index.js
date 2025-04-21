"use strict"; // Enforces stricter parsing and error handling in your JavaScript code

// Declare the port number for the server
const port = 3000,

  // Import the built-in HTTP module to create the server
  http = require("http"),

  // Import the HTTP status codes module for more readable response codes
  httpStatus = require("http-status-codes"),

  // Create an HTTP server instance
  app = http.createServer();

// Event listener for incoming requests
app.on("request", (req, res) => {
  // Set the HTTP response header with a 200 OK status and content type as HTML
  res.writeHead(httpStatus.OK, {
    "Content-Type": "text/html"
  });

  // Define the message that will be sent back in the response body
  let responseMessage = `
    <html>
      <head>
        <title>Hello, Universe!</title>
        <style>
          body {
            background-color: #fce4ec;
            color: #880e4f;
            font-family: 'Comic Sans MS', cursive, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
          }
          h1 {
            font-size: 3em;
            margin-bottom: 0.5em;
          }
          p {
            font-size: 1.5em;
          }
        </style>
      </head>
      <body>
        <h1>Hello Universe!</h1>
        <p>This is a Node.JS Server.</p>
      </body>
    </html>
  `;
  
  // End the response and send the message to the client
  res.end(responseMessage);
});

// Start the server and have it listen on the specified port
app.listen(port);

// Log a message to the console indicating the server is running
console.log(`The server has started and is listening on port number: ${port}`);
