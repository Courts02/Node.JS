// Set the port number where your server will run
const port = 3000;

// Import the Express module (web framework for Node.js)
const express = require("express");

// Initialize a new Express application instance
const app = express();

/*
  Define a route handler for the root URL ("/")
  When a GET request is made to "/", this function will run
*/
app.get("/", (req, res) => {
    // Log the route parameters (from dynamic URLs like "/user/:id"), empty in this case
    console.log(req.params);

    // Log the request body (only populated with POST/PUT requests and if body-parser middleware is used)
    console.log(req.body);

    // Log the full request URL
    console.log(req.url);

    // Log query parameters (like /?name=Courtney)
    console.log(req.query);

    // Send a simple response to the browser or client
    res.send("Hello, Universe!");
});

/*
  Start the server and make it listen on the specified port
  The callback function runs once the server is successfully running
*/
app.listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
});

/*
  This is an extra function you’ve defined manually called createServer
  It doesn't actually start a server — it just logs a message.
  (Note: it's never called anywhere, so it won’t do anything unless you call it manually)
*/
function createServer() {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
};
