"use strict";

const mongoose = require("mongoose");
const ExerciseSchema = require("./ExerciseSchema");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  log: {
    type: [ExerciseSchema],
    default: []
  }
});

module.exports = UserSchema;
