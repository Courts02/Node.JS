"use strict";

// Array of course objects
let courses = [
  {
    title: "Event Driven Cakes",
    cost: 50
  },
  {
    title: "Asynchronous Artichoke",
    cost: 25
  },
  {
    title: "Object Oriented Orange Juice",
    cost: 10
  }
];

// Renders the 'courses' view with the list of available courses
exports.showCourses = (req, res) => {
  res.render("courses", {
    offeredCourses: courses // Sends courses data to the view
  });
};

// Renders the homepage ('index' view)
exports.index = (req, res) => {
  res.render("index");
};

// Middleware to log the requested path to the console
exports.logRequestPaths = (req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next(); // Passes control to the next middleware/route handler
};

// Renders the subscription form (Contact page)
exports.getSubscriptionPage = (req, res) => {
  res.render("contact");
};

// Another version of the 'showSignUp' function, rendering the contact page
exports.showSignUp = (req, res) => {
  res.render("contact");
};

// Handles the POST request after the subscription form is submitted, renders a thank-you page
exports.postedSignUpForm = (req, res) => {
  res.render("thanks");
};
