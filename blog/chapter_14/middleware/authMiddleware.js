// Import the User model to check for the logged-in user
const User = require("../models/User");

// Export the middleware function to check if a user is logged in
module.exports = (req, res, next) => {
    // Look for the user in the database by their userId (stored in the session)
    User.findById(req.session.userId, (error, user) => {
        // If there is an error or the user doesn't exist, redirect to the homepage
        if (error || !user) {
            return res.redirect('/');
        }

        // If the user exists, move on to the next middleware or route handler
        next();
    });
};
