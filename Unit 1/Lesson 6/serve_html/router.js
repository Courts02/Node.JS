// Import HTTP status codes for readable constants (e.g., 200 OK, 404 Not Found)
const httpStatus = require("http-status-codes");

// Define content type for HTML responses
const htmlContentType = {
    "Content-Type": "text/html"
};

// Define a simple routing object with methods as keys
const routes = {
    "GET": {
        // Example GET route: /info
        "/info": (req, res) => {
            res.writeHead(httpStatus.OK, {
                "Content-Type": "text/plain"
            });
            res.end("Welcome to the Info Page!"); // Plain text response
        }
    },
    "POST": {
        // POST routes will be added dynamically
    }
};

// Handle function exported for use in the main server file
// It looks up the request method and URL in the routes object
exports.handle = (req, res) => {
    try {
        if (routes[req.method][req.url]) {
            // If route exists, call the associated function
            routes[req.method][req.url](req, res);
        } else {
            // If no matching route, respond with 404 Not Found
            res.writeHead(httpStatus.NOT_FOUND, htmlContentType);
            res.end("<h1>No such file exists</h1>");
        }
    } catch (ex) {
        // Log any unexpected errors
        console.log("error: " + ex);
    }
};

// Function to register a new GET route
exports.get = (url, action) => {
    routes["GET"][url] = action;
};

// Function to register a new POST route
exports.post = (url, action) => {
    routes["POST"][url] = action;
};
