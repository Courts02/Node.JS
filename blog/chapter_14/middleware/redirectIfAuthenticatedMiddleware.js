// Export middleware to check if a user is already logged in
module.exports = (req, res, next) => {
    // Check if there's a userId in the session, meaning the user is logged in
    if (req.session.userId) {
        // If the user is logged in, redirect them to the homepage
        return res.redirect('/'); // Redirect to the home page if logged in
    }

    // If the user is not logged in, continue to the next middleware or route handler
    next();
};
