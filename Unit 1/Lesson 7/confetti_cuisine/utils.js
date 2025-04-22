"use strict";

// Import required modules
const fs = require("fs"), // Node's file system module to read files
    httpStatus = require("http-status-codes"), // For readable HTTP status codes
    contentTypes = require("./contentTypes"); // Import custom content type mappings

module.exports = {
    // Exported method to read and serve a file
    getFile: (file, res) => {
        // Attempt to read the specified file from disk
        fs.readFile(`./${file}`, (error, data) => {
            if (error) {
                // If there’s an error reading the file, send a 500 response with HTML content type
                res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, contentTypes.html);
                res.end("There was an error serving content!");
                return; // Stop here so res.end(data) doesn’t run after an error
            }

            // If successful, send the file data as the response
            res.end(data);
        });
    }
};
