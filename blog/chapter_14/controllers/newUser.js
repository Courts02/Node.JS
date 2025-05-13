// Export a function to handle rendering the registration page
module.exports = (req, res) => {
    // Initialize default values for form fields
    var username = "";
    var password = "";

    // Retrieve any flashed form data (used if the form was submitted with errors)
    const data = req.flash('data')[0];

    // If there is previous form data, pre-fill the form fields
    if (typeof data != "undefined") {
        username = data.username;
        password = data.password;
    }

    // Render the 'register' view and pass:
    // - any validation errors
    // - previously entered username and password (if available)
    res.render('register', {
        errors: req.flash('validationErrors'),
        username: username,
        password: password
    });
};
