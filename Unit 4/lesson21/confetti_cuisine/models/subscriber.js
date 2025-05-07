"use strict"; // Ensures safer JavaScript (no undeclared vars, etc.)

// Import Mongoose to define the schema/model
const mongoose = require("mongoose");

// Define the schema for a Subscriber (someone who signs up for updates/newsletter/etc.)
const subscriberSchema = mongoose.Schema({
    name: {
        type: String,
        required: true // Name is mandatory
    },
    email: {
        type: String,
        required: true, // Email is mandatory
        lowercase: true, // Automatically stores email in lowercase
        unique: true // No two subscribers can share the same email
    },
    zipCode: {
        type: Number,
        min: [10000, "Zip code too short"], // Minimum 5-digit zip code
        max: 99999 // Maximum 5-digit zip code
    }
});

// Export the model so it can be used in other files
// Model name: "Subscriber", based on subscriberSchema
module.exports = mongoose.model("Subscriber", subscriberSchema);
