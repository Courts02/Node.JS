"use strict";

// Exporting an object that maps file extensions to their appropriate Content-Type headers
module.exports = {
    html: {
        "Content-Type": "text/html" // For .html files
    },
    text: {
        "Content-Type": "text/plain" // For plain text files or responses
    },
    js: {
        "Content-Type": "text/js" // ⚠️ Should be "application/javascript"
    },
    jpg: {
        "Content-Type": "image/jpg" // For JPEG images
    },
    png: {
        "Content-Type": "image/png" // For PNG images
    },
    css: {
        "Content-Type": "text/css" // For stylesheets
    }
};

// Notes:
// - `module.exports`: Makes this object available to other files that require it.
// - Each key corresponds to a file extension.
// - The `Content-Type` value tells the browser how to interpret the data in the response.
// - This is super useful for serving static files!
