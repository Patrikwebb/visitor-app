// Express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Routes
const singin = require("./routes/signin");
const mongodb = require("./routes/mongodb");
const company = require("./routes/company");
const visitor = require("./routes/visitor");

// MongoDB Mongoose
const mongoose = require("mongoose");

// Headers options
const corsHeaders = (req, res, next) => {
  // For: No 'Access-Control-Allow-Origin
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET", "POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  res.setHeader("Content-Type", "application/json");

  next();
};

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/companyapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.debug("Connected to mongo");
});

// Cors && Headers
app.use(corsHeaders);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Routing
app.use("/signin", singin);
app.use("/mongodb", mongodb);
app.use("/company", company);
app.use("/visitor", visitor);

app.listen(3040, () => {
  console.debug("Server listening on port 3040!");
});
