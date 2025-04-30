"use strict"; // Enforce strict mode for safer JavaScript

// Import mongoose to define a schema and create a model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Define the schema for a Recipe document in MongoDB
const recipeSchema = new Schema({
  title: {
    type: String,          // The name of the recipe
    required: true         // This field is required
  },
  ingredients: [
    {
      type: String,        // A list of ingredients as strings
      required: true       // Each ingredient must be provided
    }
  ],
  preparation: {
    type: String,          // Instructions for preparing the recipe
    required: true         // This field is required
  },
  courseType: {
    type: String,          // The type of course (e.g., appetizer, dessert)
    enum: [                // Limit values to a set list
      "Appetizer",
      "Main Course",
      "Dessert",
      "Snack",
      "Drink"
    ],
    default: "Main Course" // If not specified, defaults to "Main Course"
  },
  cookingTime: {
    type: Number,          // Time required to cook in minutes
    required: true         // This field is required
  },
  createdAt: {
    type: Date,            // Date when the recipe was added
    default: Date.now      // Automatically sets to current date/time
  }
});

// Export the model so it can be used in other files (e.g., controllers, routes)
module.exports = mongoose.model("Recipe", recipeSchema);
