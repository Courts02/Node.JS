/*
 * Error Handling Middleware
 * --------------------------
 * This file contains middleware functions for:
 *  - Logging all application errors
 *  - Handling 404 "Resource Not Found" errors
 *  - Handling 500 "Internal Server Error" issues
 * It helps make error responses cleaner and more user-friendly!
 */

// Import the http-status-codes module for easier use of status codes
const httpStatus = require("http-status-codes");

// Middleware to log all errors
exports.logErrors = (error, req, res, next) => {
    // Log the error stack trace to the console for debugging
    console.error(error.stack);
    // Pass the error to the next error-handling middleware
    next(error);
};

// Middleware to handle "Resource Not Found" (404) errors
exports.respondNoResourceFound = (req, res) => {
    let errorCode = httpStatus.NOT_FOUND; // 404 error code
    res.status(errorCode); // Set response status to 404
    // Send the 404.html file from the public directory
    res.sendFile(`./public/${errorCode}.html`, { root: "./" });
};

// Middleware to handle "Internal Server" (500) errors
exports.respondInternalError = (error, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR; // 500 error code
    // Log the error stack trace
    console.log(`ERROR occurred: ${error.stack}`);
    res.status(errorCode); // Set response status to 500
    // Send the 500.html file from the public directory
    res.sendFile("./public/500.html", { root: "./" });
};
