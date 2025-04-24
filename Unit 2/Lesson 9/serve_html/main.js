// mvc = views, models & classes
// models communicate with views

// Import the homeController module where your route logic lives
const homeController = require("./controllers/homeController");

// Set the port number
const port = 3000;

// Import the Express framework
const express = require("express");

// Initialize the Express app
const app = express();

/*
  MIDDLEWARE: Logger
  Logs every request made to your server by printing the requested URL
*/
app.use((req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next(); // Move on to the next middleware or route handler
});

/*
  MIDDLEWARE: Parses form data (like from <form> submissions)
  `extended: false` uses the classic query string parser
*/
app.use(
    express.urlencoded({
        extended: false
    })
);

/*
  MIDDLEWARE: Parses incoming JSON data and makes it accessible via req.body
*/
app.use(express.json());

/*
  EXAMPLE: You can use this route for a contact form later
*/
// app.post("/contact", (req, res) => {
//     res.send("Contact information submitted successfully.");
// });

/*
  ROUTE: GET /item/vegtable
  Uses the `sendReqParam` function from homeController
  This will handle dynamic vegetable names like /items/carrot
*/
app.get("/items/:vegetable", homeController.sendReqParam);

/*
  ROUTE: POST /
  Uses the `sendPost` function from homeController
  This route can handle JSON or form data posted to the root URL
*/
app.post("/", homeController.sendPost);

/*
  Start the server and listen for incoming connections
*/
app.listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
});
