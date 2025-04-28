"use strict"; // Enforces strict mode for safer JavaScript

// Import required modules
const express = require("express");
const app = express();
const errorController = require("./controllers/errorController"); // Custom error handling middleware
const homeController = require("./controllers/homeController"); // Custom home-related middleware and routes
const layouts = require("express-ejs-layouts"); // Layout support for EJS templates

const MongoDB = require("mongodb").MongoClient; // MongoDB client for database interactions
const dbURL = "mongodb://0.0.0.0:27017"; // URL for MongoDB server
const dbName = "recipe_db"; // Name of the database

// Connect to MongoDB
MongoDB.connect(dbURL, (error, client) => {
  if (error) throw error; // If connection fails, throw an error

  let db = client.db(dbName); // Get a reference to the database

  // Insert a document into the "contacts" collection
  db.collection("contacts")
    .insert(
      {
        name: "Jada Mathele",
        email: "jada@mathele.com",
      },
      (error, db) => {
        if (error) throw error; // If insertion fails, throw an error
        console.log(db); // Log the result of the insertion
      }
    );

  // Find all documents in the "contacts" collection and print them as an array
  db.collection("contacts")
    .find()
    .toArray((error, data) => {
      if (error) throw error; // If finding fails, throw an error
      console.log(data); // Log the array of documents
    });
});

// Set application settings
app.set("port", process.env.PORT || 3000); // Set port from environment variable or default to 3000
app.set("view engine", "ejs"); // Set EJS as the view engine

// Middleware setup
app.use(express.static("public")); // Serve static files from the "public" directory
app.use(layouts); // Use express-ejs-layouts for layout management
app.use(
  express.urlencoded({
    extended: false,
  })
); // Parse URL-encoded bodies (form submissions)
app.use(express.json()); // Parse JSON bodies
app.use(homeController.logRequestPaths); // Log request paths

// Route handlers
app.get("/name", homeController.respondWithName); // Route for rendering the "index" view
app.get("/items/:vegetable", homeController.sendReqParam); // Route for responding with a vegetable name from URL parameter

// Handle POST requests to the root URL
app.post("/", (req, res) => {
  console.log(req.body); // Log the request body
  console.log(req.query); // Log query parameters
  res.send("POST Successful!"); // Send success message
});

// Error handling middleware
app.use(errorController.logErrors); // Log errors
app.use(errorController.respondNoResourceFound); // Handle 404 errors
app.use(errorController.respondInternalError); // Handle 500 errors

// Start the server
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`); // Log server start message
});
