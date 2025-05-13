// Import mongoose to define the schema and interact with the database
const mongoose = require('mongoose');
// Use mongoose.Schema to define the structure of the User model
const Schema = mongoose.Schema;
// Import the mongoose-unique-validator plugin to enforce unique values for certain fields (e.g., username)
var uniqueValidator = require('mongoose-unique-validator');
// Import bcrypt for securely hashing passwords
const bcrypt = require('bcrypt');

// Define the User schema
const UserSchema = new Schema({
    // Define the 'username' field as a string
    // It is required and must be unique across the users
    username: {
        type: String,
        required: [true, 'Please provide username'], // Custom error message if username is missing
        unique: true // Ensures that each username must be unique
    },

    // Define the 'password' field as a string
    // It is required and will store the user's password (hashed)
    password: {
        type: String,
        required: [true, 'Please provide password'] // Custom error message if password is missing
    }
});

// Apply the uniqueValidator plugin to the schema to enforce unique validation
UserSchema.plugin(uniqueValidator);

// Middleware to hash the password before saving the user document
UserSchema.pre('save', function (next) {
    const user = this; // Reference to the user document being saved

    // Use bcrypt to hash the password before saving
    bcrypt.hash(user.password, 10, (error, hash) => {
        if (error) {
            return next(error); // If there's an error during hashing, pass it to the next middleware
        }

        user.password = hash; // Set the hashed password in the user document
        next(); // Proceed with saving the user document
    });
});

// Create the 'User' model based on the schema
const User = mongoose.model('User', UserSchema);

// Export the User model so it can be used in other parts of the app
module.exports = User;
