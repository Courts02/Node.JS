"use strict";

// Required modules
const express = require("express");
const app = express();
const router = express.Router(); // Optional, but good for modular routes
const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const usersController = require("./controllers/usersController");  
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");
const subscribersController = require("./controllers/subscribersController");
const methodOverride = require("method-override"); // Allows PUT/DELETE via forms
const session = require("express-session");
const flash = require("connect-flash");

// --- Mongoose: Connect to MongoDB ---
mongoose.connect("mongodb://0.0.0.0:27017/confetti_cuisine", {
  useNewUrlParser: true
});

const db = mongoose.connection;

// Log once the DB connection is open
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

// --- App Configuration ---
app.set("port", process.env.PORT || 3000); // Default port 3000 if none set
app.set("view engine", "ejs"); // Use EJS for templates

// session middleware
app.use(session({
  secret: "yourSecretKey", 
  resave: false,
  saveUninitialized: true
}));

// flash middleware
app.use(flash());

// make flash messages available in views
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

// --- Middleware Setup ---
app.use(express.static("public")); // Serve static files from "public" folder
app.use(layouts); // Use EJS layouts
app.use(express.urlencoded({ extended: false })); // Parse form submissions
app.use(express.json()); // Parse JSON requests
app.use(methodOverride("_method")); // Support PUT/DELETE via query param (?_method=PUT)

// Log every request URL to console (debugging helper)
app.use((req, res, next) => {
  console.log(`Request made to: ${req.url}`);
  next();
});

// --- Routes ---

// Home routes
app.get("/", homeController.index);
app.get("/courses", homeController.showCourses); // Display list of courses

// Contact / Subscriber sign-up form
app.get("/contact", homeController.showSignUp);
app.post("/contact", subscribersController.saveSubscriber); // Save new subscriber

// Subscriber CRUD routes
app.get("/subscribers/:id/edit", subscribersController.edit); // Edit form
app.put("/subscribers/:id/update", subscribersController.update, subscribersController.redirectView); // Update subscriber
router.delete("/subscribers/:id", subscribersController.delete, subscribersController.redirectView); // Delete subscriber
app.delete("/users/:id", usersController.delete);
app.get("/subscribers/:id", subscribersController.show, subscribersController.showView); // Show subscriber details
app.get("/subscribers", subscribersController.index, subscribersController.indexView); // List all subscribers

// Users
// Render user creation form
app.get("/users/new", (req, res) => {
  res.render("users/new");
});

// Handle new user submission
app.post("/users", usersController.create);
// Go add a button to trigger API

// --- Error Handling Middleware ---
app.use(errorController.logErrors); // Log errors
app.use(errorController.respondNoResourceFound); // 404 handler
app.use(errorController.respondInternalError); // 500 handler

// --- Start the server ---
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
