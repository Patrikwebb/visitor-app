const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const visitorSchema = new Schema({
  name: String,
});

const Visitor = mongoose.model("visitor", visitorSchema);

module.exports = Visitor;
