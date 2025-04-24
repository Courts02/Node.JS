// This function handles GET requests with a dynamic URL parameter
// Example: /items/carrot => shows "This is the page for carrot"
exports.sendReqParam = (req, res) => {
    // Get the 'vegetable' value from the URL (like 'carrot')
    let veg = req.params.vegetable;

    // Send a response using the value from the URL
    res.send(`This is the page for ${veg}`);
};

// This function handles POST requests
exports.sendPost = (req, res) => {
    // Log form or JSON data sent in the body of the request
    console.log(req.body);

    // Log any query parameters (like ?type=organic)
    console.log(req.query);

    // Send back a success message
    res.send("POST Successful!");
};

// This function renders a template and passes in a name from the URL
// Example: /name/Jane => shows "Hello, Jane" on the page using EJS
exports.respondWithName = (req, res) => {
    // Get the name from the URL path parameter
    let paramsName = req.params.myName;

    // Render the 'index.ejs' view and pass in firstName and surName
    res.render("index", {
        firstName: paramsName, // dynamic name from URL
        surName: ""            // empty for now but can be updated later
    });
};
