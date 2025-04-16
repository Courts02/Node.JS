"use strict"; 
// Enforces stricter JavaScript rules for better error catching and cleaner code

const port = 3000;
// Sets the port number your server will listen on (usually 3000 for dev)

const http = require("http");
// Imports Node.js's built-in http module to create a web server

const httpStatus = require("http-status-codes");
// Imports a module that provides readable status codes (like 200 for OK)

// Creates the server and defines how it should respond to requests
const app = http.createServer((request, response) => {
    console.log("Received an incoming request!");
    // Logs when the server gets a request

    // Sets the HTTP response header: 200 OK and content type as HTML
    response.writeHead(httpStatus.OK, {
      "Content-Type": "text/html"
    });

    // Prepares the response message
    let responseMessage = "<h1>Hello, Universe!</h1>";

    // Sends the response body
    response.write(responseMessage);

    // Ends the response (tells the server you're done sending data)
    response.end();

    // Logs what was sent to the browser
    console.log(`Sent a response : ${responseMessage}`);
});

// Tells the server to start listening on the specified port
app.listen(port);

// Logs a message to let you know the server is up and running
console.log(`The server has started and is listening on port number: ${port}`);

