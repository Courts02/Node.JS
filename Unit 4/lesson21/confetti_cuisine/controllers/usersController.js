const User = require("../models/user");

module.exports = {
    // Controller function for creating a new user
    create: (req, res) => {
        // Destructuring the data from the request body
        const { fullName, email, zipCode } = req.body;
        
        // Create a new instance of the User model with the destructured data
        const newUser = new User({
            fullName,   // User's full name
            email,      // User's email address
            zipCode     // User's zip code
        });

        // Save the new user to the database
        newUser.save()
            .then(() => {
                // On success, redirect to the users index page (list of all users)
                res.redirect("/users");  // Redirect after successful creation
            })
            .catch(error => {
                // Log the error to the console if something goes wrong
                console.log(`Error creating user: ${error.message}`);
                // Redirect to the users index page even in case of error (could show a generic error message)
                res.redirect("/users");  // Redirect in case of error
            });
    }
};
