"use strict";

// Importing http-status-codes module to use readable status codes like 404, 500
const httpStatus = require("http-status-codes");

// Middleware to handle 404 errors (page not found)
exports.pageNotFoundError = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND; // 404 error code
  res.status(errorCode); // Set response status to 404
  res.render("error"); // Render a generic error view/page (error.ejs expected)
};

// Middleware to handle 500 errors (internal server error)
exports.internalServerError = (error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR; // 500 error code
  console.log(`ERROR occurred: ${error.stack}`); // Log the full error stack in the console
  res.status(errorCode); // Set response status to 500
  res.send(`${errorCode} | Sorry, our application is taking a nap!`); // Send a friendly message to the user
};
