"use strict";

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const shortid = require("shortid");

// Express.js server, with CORS enabled, body-parser mounted
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to Mongo database
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true }
);

// Setup database schema
// ...

// Default landing page
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Listen for requests
var listener = app.listen(process.env.PORT, () => {
  console.log("Listening on port " + listener.address().port);
});
