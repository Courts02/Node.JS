"use strict";

// Importing HTTP status codes for clarity
const httpStatus = require("http-status-codes");

// Middleware to log errors in the console and pass it to the next error handling middleware
exports.logErrors = (error, req, res, next) => {
  console.error(error.stack); // Logs the full error stack trace to the console
  next(error); // Passes the error to the next middleware
};

// Middleware to handle 404 errors (Resource not found)
exports.respondNoResourceFound = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND; // Sets the HTTP status code to 404 (Not Found)
  res.status(errorCode); // Sends the status code to the client
  res.send(`${errorCode} | The page does not exist!`); // Sends a response with the error message
};

// Middleware to handle internal server errors (500)
exports.respondInternalError = (error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR; // Sets the HTTP status code to 500 (Internal Server Error)
  console.log(`ERROR occurred: ${error.stack}`); // Logs the error stack to the console for debugging
  res.status(errorCode); // Sends the status code to the client
  res.send(`${errorCode} | Sorry, our application is experiencing a problem!`); // Sends an error message to the client
};
