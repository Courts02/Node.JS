"use strict";

const Recipe = require("../models/recipe");

exports.logRequestPaths = (req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
};

exports.sendReqParam = (req, res) => {
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
};

exports.respondWithName = (req, res) => {
  res.render("index");
};

exports.createRecipe = (req, res) => {
  let newRecipe = new Recipe({
    title: "Spaghetti Carbonara",
    ingredients: ["Spaghetti", "Eggs", "Bacon", "Parmesan Cheese", "Black Pepper"],
    preparation: "Cook pasta. Fry bacon. Mix eggs and cheese. Combine all with pepper.",
    courseType: "Main Course",
    cookingTime: 30
  });

  newRecipe.save()
    .then(() => {
      res.send("New recipe added!");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error saving recipe.");
    });
};

