"use strict";

const mongoose = require("mongoose");
const UserSchema = require("./UserSchema");

const User = mongoose.model("User", UserSchema);

module.exports = (() => {
  const _errorHandler = (err, cb) => {
    console.error(err.message);
    cb({ error: "Bad request" }, 400);
  };
  const createUser = (username, cb) => {
    // First check if user name already assigned
    User.findOne({ username })
      .then(data => {
        if (data) return cb({ message: "Username already taken" }, 200);
        // Create new user
        User.create({ username })
          .then(data => {
            const response = { username: data.username, _id: data._id };
            return cb(response, 201);
          })
          .catch(err => _errorHandler(err, cb));
      })
      .catch(err => _errorHandler(err, cb));
  };
  const getAllUsers = cb => {
    // Return all user names and associated IDs
    User.find({}, "username _id")
      .then(data => {
        cb(data, 200);
      })
      .catch(err => _errorHandler(err, cb));
  };
  const addExercise = (userId, exercise, cb) => {
    // First check if valid user ID provided
    User.findById(userId)
      .then(data => {
        if (data == null) return cb({ message: "User ID not found" }, 200);
        // Push new exercise into log array
        data.log.push(exercise);
        data
          .save()
          .then(data => {
            const lastExercise = data.log.pop();
            // Return saved exercise details
            const response = {
              username: data.username,
              _id: data._id,
              description: lastExercise.description,
              duration: lastExercise.duration,
              date: new Date(lastExercise.date).toDateString()
            };
            cb(response, 200);
          })
          .catch(err => _errorHandler(err, cb));
      })
      .catch(err => _errorHandler(err, cb));
  };
  const getUserLog = (userId, params, cb) => {
    const { from, to, limit } = params;
    // First check if valid user ID provided
    // If so, save username, ID and log data from response
    User.findById(userId, "username _id log")
      .then(data => {
        if (data == null) return cb({ message: "User ID not found" }, 200);

        // Filter log by timeframe, limit (if given)
        let outputLog = [...data.log];
        if (from)
          outputLog = outputLog.filter(exercise => exercise.date > from);
        if (to) outputLog = outputLog.filter(exercise => exercise.date < to);
        if (limit) outputLog = outputLog.slice(0, limit);

        // Convert date to human-readable format
        outputLog = outputLog.map(exercise => {
          const formattedDate = new Date(exercise.date).toDateString();
          const { description, duration } = exercise;
          return { description, duration, date: formattedDate };
        });

        // Return exercise log
        const response = {
          username: data.username,
          _id: data._id,
          log: outputLog
        };
        cb(response, 200);
      })
      .catch(err => _errorHandler(err, cb));
  };
  return {
    createUser,
    getAllUsers,
    addExercise,
    getUserLog
  };
})();
