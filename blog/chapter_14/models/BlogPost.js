// Import mongoose to define the schema and interact with the database
const mongoose = require('mongoose');
// Use mongoose.Schema to define the structure of the BlogPost model
const Schema = mongoose.Schema;

// Define the BlogPost schema
const BlogPostSchema = new Schema({
    // Define the 'title' field as a string (required for blog posts)
    title: String,

    // Define the 'body' field as a string (this will hold the main content of the post)
    body: String,

    // Define 'userid' field to store a reference to the User model (the author of the post)
    // It is an ObjectId that links to the User document in the database
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // This references the 'User' model for the user who created the post
        required: true // 'userid' is a required field (every blog post must be associated with a user)
    },

    // Define the 'datePosted' field to store the date when the post was created
    // Default to the current date if no value is provided
    datePosted: {
        type: Date,
        default: new Date() // Automatically sets the date to the current date and time
    },

    // Define the 'image' field as a string (this will store the image URL or path)
    image: String
});

// Create the 'BlogPost' model based on the schema
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

// Export the BlogPost model so it can be used in other parts of the app
module.exports = BlogPost;
