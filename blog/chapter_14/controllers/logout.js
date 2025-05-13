// Export a function to handle user logout
module.exports = (req, res) => {
    // Destroy the current session (logs the user out)
    req.session.destroy(() => {
        // After session is destroyed, redirect the user to the homepage
        res.redirect('/');
    });
}
