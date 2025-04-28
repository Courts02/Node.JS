"use strict"; // Enforces strict mode for better error checking and safer JavaScript

const httpStatus = require("http-status-codes"); // Import HTTP status codes for easier status handling

// Middleware to log errors to the console
exports.logErrors = (error, req, res, next) => {
  console.error(error.stack); // Log the error stack trace for debugging
  next(error); // Pass the error to the next error handler
};

// Middleware to handle 404 (Not Found) errors
exports.respondNoResourceFound = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND; // Set the error code to 404
  res.status(errorCode); // Set the HTTP status
  res.send(`${errorCode} | The page does not exist!`); // Send a custom error message
};

// Middleware to handle 500 (Internal Server Error) errors
exports.respondInternalError = (error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR; // Set the error code to 500
  console.log(`ERROR occurred: ${error.stack}`); // Log the error stack trace
  res.status(errorCode); // Set the HTTP status
  res.send(`${errorCode} | Sorry, our application is experiencing a problem!`); // Send a custom error message
};
