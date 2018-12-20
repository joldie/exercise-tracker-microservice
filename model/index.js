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
    User.findOne({ username })
      .then(data => {
        if (data) return cb({ message: "Username already taken" }, 200);
        User.create({ username })
          .then(data => {
            const response = { username: data.username, _id: data._id };
            console.log(`Created user: ${JSON.stringify(response)}`);
            return cb(response, 201);
          })
          .catch(err => _errorHandler(err, cb));
      })
      .catch(err => _errorHandler(err, cb));
  };
  return {
    createUser
  };
})();