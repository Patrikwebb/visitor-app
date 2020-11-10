// MongoDB Model
var Company = require("../models/company");

// MongoDB Mongoose
var mongoose = require("mongoose");

function findCompany(name, companyName) {
  Company.find({ companyName: companyName }, "_id", function (err, companyId) {
    console.debug("\nLook if company name already exsist");
    if (err) {
      console.debug(err);
      // throw err;
    }
    if (companyId) {
      console.debug("Found company:");
      var id = "" + companyId;
      console.debug(id);

      // Add username object to embedded employees object
      Company.update(id, {
        $push: {
          employees: {
            $each: [{ username: name }],
          },
        },
      });
      console.debug("Company updated: " + companyId);

      return Company;
    }
  });
}
