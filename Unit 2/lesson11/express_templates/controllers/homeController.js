// Controller to handle route with a URL parameter (like /items/carrot)
exports.sendReqParam = (req, res) => {
    let veg = req.params.vegetable; // Get the vegetable name from URL
    res.send(`This is the page for ${veg}`); // Send a response using the vegetable name
};

// Controller to handle POST requests
exports.sendPost = (req, res) => {
    console.log(req.body); // Log the body of the POST request (form data or JSON)
    console.log(req.query); // Log any query parameters
    res.send("POST Successful!"); // Send a simple success message
};

// Controller to render a view (index.ejs) with a name passed as a parameter
exports.respondWithName = (req, res) => {
    // Render the index.ejs page with a firstName from the URL
    res.render("index", { firstName: req.params.myName });
};
