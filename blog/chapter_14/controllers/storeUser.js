// Import the User model to interact with user data in the database
const User = require('../models/User.js');
const path = require('path');

// Export an async function to handle user registration form submission
module.exports = async (req, res) => {
    try {
        // Try to create a new user using the data from the registration form (req.body)
        await User.create(req.body);

        // After successful user creation, redirect to the homepage
        res.redirect('/');
    } catch (error) {
        // If there are validation errors (e.g., missing fields, invalid format), handle them

        // Extract error messages from validation errors and store them in an array
        const validationErrors = Object.keys(error.errors).map(key =>
            error.errors[key].message
        );

        // Flash the validation errors and the original data (so users don’t lose what they entered)
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);

        // Redirect back to the registration page with errors and pre-filled data
        res.redirect('/auth/register');
    }
};
