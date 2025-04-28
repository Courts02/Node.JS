// Import required modules
const express = require("express");
const app = express();
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const layouts = require("express-ejs-layouts");

// Set the port and view engine
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// Middleware to use EJS layouts
app.use(layouts);

// Middleware to parse URL-encoded data (from forms)
app.use(
  express.urlencoded({
    extended: false
  })
);

// Middleware to parse JSON data
app.use(express.json());

// Custom middleware to log every request URL
app.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next(); // Pass to next middleware or route
});

// Route to handle vegetable items (dynamic route parameter)
app.get("/items/:vegetable", homeController.sendReqParam);

// Route to handle POST requests
app.post("/", homeController.sendPost);

// Route to render page with dynamic name
app.get("/name/:myName", homeController.respondWithName);

// Route to intentionally trigger an internal server error (for testing)
app.get("/force-error", (req, res, next) => {
  next(new Error("Forced internal server error"));
});

// Error handling middleware
// app.use(errorController.logErrors); // (optional) middleware to log errors
app.use(errorController.respondNoResourceFound); // 404 handler
app.use(errorController.respondInternalError); // 500 handler

// Start server and listen on the set port
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
