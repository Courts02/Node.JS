// Export middleware to validate post creation form data
module.exports = (req, res, next) => {
    // Check if there's no file uploaded or if the title or body fields are empty after trimming
    if (req.files == null || req.body.title.trim() == '' || req.body.body.trim() == '') {
        // If any of the required fields are missing or empty, redirect to the post creation page
        return res.redirect('/posts/new'); // Redirect back to the "new post" page
    }

    // If all fields are valid, continue to the next middleware or route handler
    next();
};
