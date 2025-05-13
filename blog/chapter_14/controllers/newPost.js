// newPostController.js

// Export a function to handle the "create new blog post" page
module.exports = (req, res) => {
    // Check if the user is logged in by verifying the session
    if (req.session.userId) {
        // If logged in, render the "create" view
        // Pass the userId and a flag (createPost: true) to the template
        res.render("create", { userId: req.session.userId, createPost: true });
    } else {
        // If not logged in, redirect the user to the login page
        res.redirect('/auth/login');
    }
};
