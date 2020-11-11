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
const GET_COMPANIES = "/";
const GET_COMPANY = "/:id";
const POST_COMPANY = "/";
const PUT_COMPANY_EMPLOYEES = "/employees";
const PUT_COMPANY_NAME = "/name";

// Returns all companies
router.get(GET_COMPANIES, (req, res) => {
  console.debug("\nGET: /company " + now);

  try {
    Company.find((err, company) => {
      if (err) {
        console.debug(err);
        res.send(500);
      } else {
        // object of all the companies
        console.debug(company);
        res.send(company);
      }
    });
  } catch (error) {
    res.status(500).send({ error: `Server error` });
  }
});

// Returns company by company id
router.get(GET_COMPANY, (req, res) => {
  console.debug("\nGET: /company/:id " + now);

  try {
    const { id } = req.params;

    // // get all the companies
    Company.findOne(
      { _id: new mongoose.mongo.ObjectID(id) },
      (err, company) => {
        if (err) {
          console.debug(err);
          res.status(400).send({
            error: "Could not find company with id: " + id,
          });
        } else {
          console.debug(company);
          res.send(company);
        }
      }
    );
  } catch (error) {
    res.status(500).send({ error: `Server error` });
  }
});

// Create new company
router.post(POST_COMPANY, (req, res) => {
  console.debug("\nPOST: /company" + now);

  try {
    const { companyName } = req.body;

    // create a new company
    const newCompany = Company({
      companyName: companyName.toLowerCase(),
    });

    // save the company
    newCompany.save((err) => {
      if (err) {
        console.debug(err);
        res
          .status(500)
          .send({ error: `Could not save company ${companyName}` });
      } else {
        console.debug("Company created!");
        res.send({ info: `Company ${companyName} added` });
      }
    });
  } catch (error) {
    res.status(500).send({ error: `Server error` });
  }
});

// Update employees in a company
router.put(PUT_COMPANY_EMPLOYEES, (req, res) => {
  console.debug("\nPUT: /company/employees" + now);

  try {
    const { id, employees } = req.body;

    // find and remove employees list company
    Company.findByIdAndUpdate(
      { _id: new mongoose.mongo.ObjectID(id) },
      { $set: { employees: [] } },

      (err, data) => {
        if (err) {
          res.status(500).send({ error: `Could not edit company ${id}` });
        } else {
          console.debug(data);
          if (data === null) {
            res.status(400).send({
              error: "Could not find company with id: " + id,
            });
          } else {
            // update employee's list
            Company.findByIdAndUpdate(
              { _id: new mongoose.mongo.ObjectID(id) },
              { $push: { employees: employees } },

              (err, data) => {
                if (err) {
                  res
                    .status(500)
                    .send({ error: `Could not edit company ${id}` });
                } else {
                  console.debug(data);
                  if (data === null) {
                    res.status(400).send({
                      error: "Could not find company with id: " + id,
                    });
                  } else {
                    res.send({ info: `Company ${id} updated` });
                  }
                }
              }
            );
          }
        }
      }
    );
  } catch (error) {
    res.status(500).send({ error: `Server error` });
  }
});

// Update company name
router.put(PUT_COMPANY_NAME, (req, res) => {
  console.debug("\nPUT: /company/name" + now);

  try {
    const { id, companyName } = req.body;

    // update company name
    Company.findByIdAndUpdate(
      { _id: new mongoose.mongo.ObjectID(id) },
      { companyName: companyName },

      (err, data) => {
        if (err) {
          res
            .status(500)
            .send({ error: `Could not edit company ${companyName}` });
        } else {
          console.debug(data);
          if (data === null) {
            res.status(400).send({
              error: "Could not find company with id: " + id,
            });
          } else {
            res.send({ info: `Company ${companyName} updated` });
          }
        }
      }
    );
  } catch (error) {
    console.debug(error);
    res.status(500).send({ error: `Server error` });
  }
});

module.exports = router;
