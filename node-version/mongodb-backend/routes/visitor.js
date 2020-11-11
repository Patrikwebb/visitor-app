// Date formater
const now = new Date();

// Express
const express = require("express");
const router = express.Router();

// MongoDB Model
const Visitor = require("../models/visitor");

// Routes
const GET_VISITORS = "/";

// Returns all visitors
router.get(GET_VISITORS, (req, res) => {
  console.debug("\nGET: /visitor " + now);

  try {
    Visitor.find((err, visitors) => {
      if (err) {
        console.debug(err);
        res.send(500);
      } else {
        // object of all the visitors
        console.debug(visitors);
        res.send(visitors);
      }
    });
  } catch (error) {
    console.debug(error)
    res.status(500).send({ error: `Server error` });
  }
});

module.exports = router;
