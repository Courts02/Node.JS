// Set the port number your server will listen on
const port = 3000;

// Import the Express framework
const express = require("express");

// Initialize an Express app
const app = express();

/*
  MIDDLEWARE: Logger
  This middleware will run on **every** request.
  It logs the URL that was requested.
  `next()` tells Express to move to the next middleware/route handler.
*/
app.use((req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
});

/*
  MIDDLEWARE: URL-encoded parser
  Parses data from HTML forms (`application/x-www-form-urlencoded`)
  `extended: false` means it will use the classic querystring library.
*/
app.use(
    express.urlencoded({
        extended: false
    })
);

/*
  MIDDLEWARE: JSON parser
  Automatically parses incoming JSON data from requests and makes it accessible in `req.body`
*/
app.use(express.json());

/*
  DYNAMIC ROUTE: Handles GET requests to /veg/:vegetable
  The colon (:) means `vegetable` is a dynamic parameter that can be anything.
  Example: visiting /veg/carrot will display "This page is for carrot"
*/
app.get("/veg/:vegetable", (req, res) => {
    let veg = req.params.vegetable; // Capture the value from the URL
    res.send(`This page is for ${veg}`);
});

/*
  POST ROUTE: Handles POST requests to the root URL ("/")
  It logs any data sent in the body and any query parameters
  then responds with a success message.
*/
app.post("/", (req, res) => {
    console.log(req.body);  // Parsed body (from JSON or form)
    console.log(req.query); // Any query parameters (like ?name=value)
    res.send("POST Successful!");
});

/*
  This was a commented-out example route for a contact form.
  You can use it later if needed:
*/
// app.post("/contact", (req, res) => {
//     res.send("Contact information submitted successfully.");
// });

/*
  Start the server
  This tells your app to listen for requests on the defined port
*/
app.listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
});
