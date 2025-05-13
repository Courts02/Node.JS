// Import the BlogPost model to interact with blog post data from the database
const BlogPost = require('../models/BlogPost.js');

// Export an async function to handle requests to the homepage (e.g. '/')
module.exports = async (req, res) => {
    // Retrieve all blog posts from the database
    // .populate('userid') includes user info (like the author's name) for each post
    const blogposts = await BlogPost.find({}).populate('userid');

    // Log the current session data to the console (useful for debugging login/session info)
    console.log(req.session);

    // Render the 'index' view (homepage) and pass the blogposts array to the template
    res.render('index', {
        blogposts
    });
}
