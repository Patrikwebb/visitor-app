// Date formater
const now = new Date();

// Express
const express = require("express");
const router = express.Router();

// MongoDB Model
const Company = require("../models/company");

// MongoDB Mongoose
const mongoose = require("mongoose");

// Routes
const POPULATE_MONGO = "/populate";
const DROP_DATABASE = "/drop";

// Populate companies
router.get(POPULATE_MONGO, (req, res) => {
  console.debug("\nGET: /mongodb/populate " + now);

  // create a new company
  const newCompany = Company({
    companyName: "peopl",
    employees: [
      "5fa9da8da486b92d5c4ffe55",
      "5fa9da8da486b92d5c4ffe66",
      "5fa9da8da486b92d5c4ffe77",
    ],
  });

  // save the company
  newCompany.save((err, data) => {
    if (err) {
      console.debug(err);
    } else {
      console.debug(data);
    }
  });

  // create a new company
  const newCompany2 = Company({
    companyName: "afry",
    employees: [
      "5fa9da8da486b92d5c4ffe88",
      "5fa9da8da486b92d5c4ffe99",
      "5fa9da8da486b92d5c4ffe11",
    ],
  });

  // save the company
  newCompany2.save((err, data) => {
    if (err) {
      console.debug(err);
      res.status(500).send({ error: "Could not populate database" });
    } else {
      console.debug(data);
      res.send({ db: "populated" });
    }
  });
});

// Drop companies docs
router.get(DROP_DATABASE, (req, res) => {
  console.debug("\nGET: /mongodb/drop " + now);

  mongoose.connection.db
    .dropDatabase()
    .catch((err) => {
      console.debug(err);
      res.status(500).send({ error: "Could not drop database" });
    })
    .then((data) => {
      console.debug(data);
      res.send({ db: "dropDatabase" });
    });
});

module.exports = router;
