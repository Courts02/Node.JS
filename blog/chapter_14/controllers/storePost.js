// Import the BlogPost model and Node's built-in 'path' module for handling file paths
const BlogPost = require('../models/BlogPost.js');
const path = require('path');

// Export a function to handle creating and saving a new blog post
module.exports = (req, res) => {
    // Get the uploaded image file from the request
    let image = req.files.image;

    // Move the image file to the public/img directory
    image.mv(path.resolve(__dirname, '..', 'public/img', image.name), async (error) => {
        if (error) {
            // If there's an error saving the image, log it and return an error response
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }

        // Get the ID of the logged-in user from the session
        const userId = req.session.userId;

        try {
            // Create a new blog post in the database with form data, image path, and user ID
            await BlogPost.create({
                ...req.body,                      // Spread form fields (title, content, etc.)
                image: '/img/' + image.name,      // Save the image path to the database
                userid: userId                    // Associate the post with the logged-in user
            });

            // Redirect to the homepage after the post is successfully saved
            res.redirect('/');
        } catch (err) {
            // If something goes wrong during database save, log and send error
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    });
};
