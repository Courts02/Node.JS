const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");
const express = require("express");
const app = express();

mongoose.connect("mongodb://0.0.0.0:27017/recipe_db",
  { useNewUrlParser: true }
);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");

});

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());