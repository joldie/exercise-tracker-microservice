"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("./router");

const app = express();

// Mount middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect database
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true }
);

// API routing
app.use(express.static("public"));

// Default landing page
app.use("/api/exercise", router);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Listen for requests
var listener = app.listen(process.env.PORT, () => {
  console.log("Listening on port " + listener.address().port);
});
