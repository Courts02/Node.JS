// Set the port number the server will listen on
const port = 8000;

// Import required modules
const http = require("http"); // Core module to create the HTTP server
const httpStatusCodes = require("http-status-codes"); // For readable HTTP status code constants
const router = require("./router"); // Custom router to handle routes
const fs = require("fs"); // File system module to read files

// Define response headers for plain text
const plainTextContentType = {
    "Content-Type": "text/plain"
};

// Define response headers for HTML
const htmlContentType = {
    "Content-Type": "text/html"
};

// Custom function to read and serve a file
const customReadFile = (file, res) => {
    fs.readFile(`./${file}`, (errors, data) => {
        if (errors) {
            console.log("Error reading the file...");
        }
        res.end(data); // Send the file content as response
    });
};

// Handle GET request to root ("/")
// Responds with plain text "bye"
router.get("/", (req, res) => {
    res.writeHead(httpStatusCodes.OK, plainTextContentType); // 200 OK
    res.end("page under dev."); // Plain text response
});

// Handle GET request to "/index.html"
// Reads and returns the HTML file from views/index.html
router.get("/index.html", (req, res) => {
    res.writeHead(httpStatusCodes.OK, htmlContentType); // 200 OK with HTML header
    customReadFile("views/index.html", res); // Serve HTML file
});

// Handle POST request to root ("/")
// Responds with plain text "POSTED"
router.post("/", (req, res) => {
    res.writeHead(httpStatusCodes.OK, plainTextContentType); // 200 OK
    res.end("POSTED"); // Plain text response
});

// Create and start the server, using the router to handle incoming requests
http.createServer(router.handle).listen(port);

// Log message when server starts
console.log(`The server is listening on port number: ${port}`);
