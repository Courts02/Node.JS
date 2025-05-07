"use strict";

const Subscriber = require("../models/subscriber");

module.exports = {
  // Fetches all subscribers from the database and makes them available in res.locals
  index: (req, res, next) => {
    Subscriber.find({})
      .then(subscribers => {
        res.locals.subscribers = subscribers; // Stores subscribers in res.locals
        next(); // Passes control to the next middleware
      })
      .catch(error => {
        console.log(`Error fetching subscribers: ${error.message}`);
        next(error); // Passes error to the next middleware
      });
  },

  // Renders the 'index' view of all subscribers
  indexView: (req, res) => {
    res.render("subscribers/index");
  },

  // Saves a new subscriber to the database and renders the 'thanks' page
  saveSubscriber: (req, res) => {
    let newSubscriber = new Subscriber({
      name: req.body.name,
      email: req.body.email,
      zipCode: req.body.zipCode
    });
    newSubscriber
      .save()
      .then(() => {
        res.render("thanks"); // Renders thank-you page after saving
      })
      .catch(error => {
        if (error) {
          res.send(error); // Sends error if saving fails
        }
      });
  },

  // Renders the form to create a new subscriber
  new: (req, res) => {
    res.render("subscribers/new");
  },

  // Creates a new subscriber and redirects to the subscribers list
  create: (req, res, next) => {
    let subscriberParams = {
      name: req.body.name,
      email: req.body.email,
      zipCode: req.body.zipCode
    };
    Subscriber.create(subscriberParams)
      .then(subscriber => {
        res.locals.redirect = "/subscribers"; // Redirect path
        res.locals.subscriber = subscriber; // Adds new subscriber to res.locals
        next(); // Passes control to the next middleware
      })
      .catch(error => {
        console.log(`Error saving subscriber: ${error.message}`);
        next(error); // Passes error to the next middleware
      });
  },

  // Fetches a specific subscriber by ID and makes it available in res.locals
  show: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findById(subscriberId)
      .then(subscriber => {
        res.locals.subscriber = subscriber; // Makes subscriber available for the view
        next(); // Passes control to the next middleware
      })
      .catch(error => {
        console.log(`Error fetching subscriber by ID: ${error.message}`);
        next(error); // Passes error to the next middleware
      });
  },

  // Renders the show view for a single subscriber
  showView: (req, res) => {
    res.render("subscribers/show");
  },

  // Renders the form to edit a subscriber's details
  edit: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findById(subscriberId)
      .then(subscriber => {
        res.render("subscribers/edit", {
          subscriber: subscriber // Passes subscriber details to the edit form
        });
      })
      .catch(error => {
        console.log(`Error fetching subscriber by ID: ${error.message}`);
        next(error); // Passes error to the next middleware
      });
  },

  // Updates a subscriber's details in the database
  update: (req, res, next) => {
    let subscriberId = req.params.id,
      subscriberParams = {
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode
      };

    Subscriber.findByIdAndUpdate(subscriberId, {
      $set: subscriberParams
    })
      .then(subscriber => {
        res.locals.redirect = `/subscribers/${subscriberId}`; // Redirect to the updated subscriber page
        res.locals.subscriber = subscriber; // Passes updated subscriber to the next middleware
        next(); // Passes control to the next middleware
      })
      .catch(error => {
        console.log(`Error updating subscriber by ID: ${error.message}`);
        next(error); // Passes error to the next middleware
      });
  },

  // Deletes a subscriber by ID from the database
  delete: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findByIdAndDelete(subscriberId)
      .exec()
      .then(() => {
        res.locals.redirect = "/subscribers"; // Redirect to subscribers list after deletion
        next(); // Passes control to the next middleware
      })
      .catch(error => {
        console.log(`Error deleting subscriber by ID: ${error.message}`);
        next(error); // Passes error to the next middleware
      });
  },

  // Redirects to the appropriate path after an action is performed
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) {
      res.redirect(redirectPath); // Redirects to the specified path
    } else {
      res.redirect("/subscribers"); // Defaults to subscribers list page
    }
  }
};
