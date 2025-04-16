"use strict";
// Enables strict mode — catches common coding errors and enforces cleaner JavaScript

const cities = require("cities");
// Loads the 'cities' package, which lets you look up city info by ZIP code

var myCity = cities.zip_lookup("10016");
// Uses the zip_lookup function to find info about the ZIP code "10016" (New York City)
// The result is a JavaScript object with city, state, latitude, longitude, etc.

console.log(myCity);
// Prints the resulting object to the console so you can see the city data

