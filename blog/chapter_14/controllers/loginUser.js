// Import the User model and bcrypt for password comparison
const User = require('../models/User.js');
const bcrypt = require('bcrypt');

// Export an async function to handle login form submissions
module.exports = async (req, res) => {
  // Destructure the email and password from the request body
  const { email, password } = req.body;

  try {
    // Look for a user in the database with the provided email
    const user = await User.findOne({ email });

    if (user) {
      // Compare the submitted password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // If password matches, store the user's ID in the session
        req.session.userId = user._id;

        // Redirect to homepage after successful login
        return res.redirect('/');
      }
    }

    // If login fails (wrong email or password), show a flash message and redirect to login page
    req.flash('error', 'Invalid email or password');
    res.redirect('/auth/login');

  } catch (error) {
    // If an error occurs (like DB connection issue), log it and redirect to login
    console.error(error);
    res.redirect('/auth/login');
  }
};
