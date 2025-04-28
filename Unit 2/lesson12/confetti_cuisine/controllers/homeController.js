"use strict";

// Create an array of course objects with title and cost properties
var courses = [
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

// Controller function to display the list of courses
exports.showCourses = (req, res) => {
  res.render("courses", {
    offeredCourses: courses // Pass the courses array to the "courses.ejs" view
  });
};

// Controller function to show the sign-up form
exports.showSignUp = (req, res) => {
  res.render("contact"); // Render the "contact.ejs" view
};

// Controller function to handle form submission and show a thank you page
exports.postedSignUpForm = (req, res) => {
  res.render("thanks"); // Render the "thanks.ejs" view after form is submitted
};
