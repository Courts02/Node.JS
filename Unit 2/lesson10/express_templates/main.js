// Import required modules
const express = require("express");
const app = express();
const homeController = require("./controllers/homeController"); // Custom controller functions
const layouts = require("express-ejs-layouts"); // Middleware to use EJS layouts

// Set the port (default to 3000 if no environment port is provided)
app.set("port", process.env.PORT || 3000);

// Set EJS as the templating engine
app.set("view engine", "ejs");

// Use express-ejs-layouts for layout support
app.use(layouts);

// Middleware to parse URL-encoded form data
app.use(
  express.urlencoded({
    extended: false // Use classic querystring library
  })
);

// Middleware to parse JSON data from the request body
app.use(express.json());

// Custom middleware to log each request URL to the console
app.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next(); // Pass control to the next middleware or route
});

// ROUTES

// Route: Handles GET requests with a dynamic 'vegetable' URL parameter
// Example: /items/carrot
app.get("/items/:vegetable", homeController.sendReqParam);

// Route: Handles POST requests to the root URL
app.post("/", homeController.sendPost);

// Route: Renders index page with a dynamic name from the URL
// Example: /name/Jane
app.get("/name/:myName", homeController.respondWithName);

// Route: Renders the homepage with blank name values
app.get("/", (req, res) => {
  res.render("index", { firstName: "", surName: "" });
});

// Route: Renders the contact page
app.get("/contact", (req, res) => {
  res.render("contact");
});

// Start the server and listen on the defined port
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
