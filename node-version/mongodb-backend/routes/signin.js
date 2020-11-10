// Date formater
const now = new Date();

// Express
const express = require("express");
const router = express.Router();

// MongoDB Model
const Company = require("../models/company");
const Visitor = require("../models/visitor");

// Routes
const signin = "/";

// Sing in and saves name & company to mongoDB (No authentcation)
router.post(signin, async (req, res) => {
  console.debug("\nPOST: /signin " + now);

  try {
    const { name, company } = req.body;

    if (name && name.length > 1 && company && company.length > 1) {
      // add visitor
      const visitor = await addVisitor(name);

      // connect visitor to company
      await connectVisitorWithCompany(visitor._id, company);

      res.send({ visitor: visitor._id, company: company });
    } else if (name && name.length > 1) {
      const visitor = await addVisitor(name);
      res.send({ visitor: visitor._id });
    } else {
      res.status(400).send({ error: `Missing name` });
    }
  } catch (error) {
    console.debug(error);
    res.status(500).send({ error: `Could not add visitor` });
  }
});

const addVisitor = (name) => {
  return new Promise((resolve, reject) => {
    // add visitor
    const visitor = Visitor({
      name: name.toLowerCase(),
    });

    // save the company
    visitor.save((err, data) => {
      if (err) {
        console.debug(err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const connectVisitorWithCompany = (visitorId, company) => {
  return new Promise((resolve, reject) => {
    // connect visitor to company
    const newCompany = Company({
      companyName: company.toLowerCase(),
      employees: [visitorId],
    });

    // save the company
    newCompany.save((err, data) => {
      if (err) {
        console.debug(err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = router;
