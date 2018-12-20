"use strict";

const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
    max: 24 * 60
  },
  date: {
    type: Number,
    default: Date.now()
  }
});

module.exports = ExerciseSchema;
