// Exporting a function named sendReqParam to handle GET requests with a dynamic parameter
exports.sendReqParam = (req, res) => {
    // Grab the 'vegetable' from the URL path (e.g., /veg/carrot => "carrot")
    let veg = req.params.vegetable;

    // Send a response back to the client
    res.send(`This is the page for ${veg}`);
};

// Exporting a function named sendPost to handle POST requests
exports.sendPost = (req, res) => {
    // Log the body of the request (data sent via JSON or form)
    console.log(req.body);

    // Log any query parameters (e.g., /?type=organic)
    console.log(req.query);

    // Send a response indicating the POST was successful
    res.send("POST Successful!");
};
