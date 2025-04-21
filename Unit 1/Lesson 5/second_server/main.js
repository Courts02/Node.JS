"use strict"; // Enforce strict mode for cleaner, safer code

// Import required modules
const port = 8000,
  http = require("http"), // Node's core HTTP module to create the server
  httpStatus = require("http-status-codes"), // For readable HTTP status codes like 200, 404, etc.
  app = http.createServer();

// Helper function to make JavaScript objects look pretty in the console
const getJSONString = obj => {
  return JSON.stringify(obj, null, 2); // Pretty print with 2-space indentation
};

app.on("request", (req, res) => {
  var body = [];

  // Collect incoming data chunks from the request body
  req.on("data", bodyData => {
    body.push(bodyData); // Push each chunk into the 'body' array
  });

  // Once all data is received, handle it here
  req.on("end", () => {
    body = Buffer.concat(body).toString(); // Combine chunks and convert to a readable string

    //Log the actual body/content of the request (like form data or JSON sent from client)
    console.log(`Request Body Contents:\n${body}`);
  });

  //Log the HTTP method used for the request (GET, POST, etc.)
  console.log(`Method:\n${getJSONString(req.method)}`);

  // Log the URL that was requested (like "/", "/about", etc.)
  console.log(`URL:\n${getJSONString(req.url)}`);

  //Log the headers sent with the request (info like browser type, content type, etc.)
  console.log(`Headers:\n${getJSONString(req.headers)}`);

  // Set response status and headers (200 OK and HTML content)
  res.writeHead(httpStatus.OK, {
    "Content-Type": "text/html"
  });

  // HTML message to send back in the browser
  let responseMessage = `
    <html>
      <head>
        <title>Request Received!</title>
        <style>
          body {
            background-color: #e3f2fd;
            font-family: Arial, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            color: #0d47a1;
            flex-direction: column;
          }
          h1 {
            font-size: 2.5em;
          }
        </style>
      </head>
      <body>
        <h1>Request Received!</h1>
        <p>Check the console for more detials!</p>
      </body>
    </html>
  `;

  res.end(responseMessage); // Send the response back to the client
});

// Start the server and print confirmation that it's listening
console.log(`The server has started and is listening on port number: ${port}`);
