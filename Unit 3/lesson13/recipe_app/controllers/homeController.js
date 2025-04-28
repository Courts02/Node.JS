"use strict"; // Enforces strict mode for safer JavaScript

// Middleware to log the path of each incoming request
exports.logRequestPaths = (req, res, next) => {
  console.log(`request made to: ${req.url}`); // Log the URL of the incoming request
  next(); // Pass control to the next middleware or route handler
};

// Route handler to send a response based on a URL parameter
exports.sendReqParam = (req, res) => {
  let veg = req.params.vegetable; // Extract the 'vegetable' parameter from the request
  res.send(`This is the page for ${veg}`); // Send a response including the vegetable name
};

// Route handler to render the 'index' view
exports.respondWithName = (req, res) => {
  res.render("index"); // Render the 'index' template/view
};
