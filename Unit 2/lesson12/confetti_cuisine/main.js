"use strict";

const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  layouts = require("express-ejs-layouts");

// Require EJS express layouts module
// Set the application to use EJS as the view engine
app.set("view engine", "ejs");

// Set the port to environment variable PORT or 3000
app.set("port", process.env.PORT || 3000);

// Parse incoming URL-encoded data into JSON objects
app.use(
  express.urlencoded({
    extended: false
  })
);

// Parse incoming JSON data
app.use(express.json());

// Enable EJS layouts
app.use(layouts);

// Serve static files (like CSS, images, client-side JS) from "public" folder
app.use(express.static("public"));

// Display the home page
app.get("/", (req, res) => {
  res.render("index");
});

// Display different pages based on browser URL
app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

// Error handling middleware (for page not found and internal server errors)
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

// Print a message in the console to show which port the server is running on
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
