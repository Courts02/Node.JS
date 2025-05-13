// Import the BlogPost model so we can interact with blog post data in the database
const BlogPost = require('../models/BlogPost.js');

// Export the controller function to handle a request for a specific blog post
module.exports = async (req, res) => {
    // Fetch the blog post by its ID from the URL (req.params.id)
    // .populate('userid') pulls in user info linked to the post (like author details)
    const blogpost = await BlogPost.findById(req.params.id).populate('userid');

    // Log the blog post to the console for debugging (optional)
    console.log(blogpost);

    // Render the 'post' view and pass the blogpost object to the template
    res.render('post', {
        blogpost
    });
}
