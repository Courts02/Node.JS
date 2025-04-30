"use strict"; // Enable strict mode for better error checking and safer code

const httpStatus = require("http-status-codes"); // Import commonly used HTTP status codes

// Middleware function to log error details
exports.logErrors = (error, req, res, next) => {
  console.error(error.stack); // Print the full error stack to the console for debugging
  next(error); // Pass the error to the next error-handling middleware
};

// Middleware function to handle 404 - Not Found errors
exports.respondNoResourceFound = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND; // Set the HTTP status code to 404
  res.status(errorCode); // Respond with the 404 status code
  res.send(`${errorCode} | The page does not exist!`); // Send a simple message to the user
};

// Middleware function to handle 500 - Internal Server Errors
exports.respondInternalError = (error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR; // Set the HTTP status code to 500
  console.log(`ERROR occurred: ${error.stack}`); // Log the error details to the console
  res.status(errorCode); // Respond with the 500 status code
  res.send(`${errorCode} | Sorry, our application is experiencing a problem!`); // Send a generic error message to the user
};
