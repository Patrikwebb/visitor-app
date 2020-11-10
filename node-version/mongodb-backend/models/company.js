const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
  companyName: String,
  employees: { type: [String], default: [] },
});

const Company = mongoose.model("company", companySchema);

module.exports = Company;
