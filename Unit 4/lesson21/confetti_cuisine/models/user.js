// Importing Mongoose to define and interact with MongoDB models
const mongoose = require("mongoose"),
  { Schema } = require("mongoose"), // Destructure Schema for convenience
  Subscriber = require("./subscriber"); // Import the Subscriber model

// Define the structure (schema) for a User document
const userSchema = new Schema(
  {
    name: {
      first: {
        type: String,
        trim: true // Removes extra spaces before/after the name
      },
      last: {
        type: String,
        trim: true
      }
    },
    email: {
      type: String,
      required: true, // Must provide an email
      unique: true // No two users can have the same email
    },
    zipCode: {
      type: Number,
      min: [10000, "Zip code too short"], // Validates lower limit
      max: 99999 // Validates upper limit
    },
    password: {
      type: String,
      required: true // Password is mandatory
    },
    courses: [
      {
        type: Schema.Types.ObjectId, // References Course documents by their ID
        ref: "Course"
      }
    ],
    subscribedAccount: {
      type: Schema.Types.ObjectId, // References a Subscriber document
      ref: "Subscriber"
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt fields
  }
);

// Virtual property to get the user's full name
userSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`;
});

// Middleware that runs *before* saving a User
// Checks if user has a linked Subscriber account
userSchema.pre("save", function (next) {
  const user = this;

  // Only run if there's no subscribedAccount already linked
  if (!user.subscribedAccount) {
    // Try to find a Subscriber with the same email
    Subscriber.findOne({ email: user.email })
      .then(subscriber => {
        if (subscriber) {
          // Link the subscriber's ID to the user
          user.subscribedAccount = subscriber._id;
        }
        next(); // Proceed to save
      })
      .catch(error => {
        console.log(`Error in connecting subscriber: ${error.message}`);
        next(error); // Pass error to Mongoose
      });
  } else {
    next(); // If already linked, just move on
  }
});

// Export the User model so it can be used in other files
// Model name: "User", based on userSchema
module.exports = mongoose.model("User", userSchema);
