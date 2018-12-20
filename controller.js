"use strict";

const model = require("./model");

module.exports = {
  createUser: (req, res) => {
    const username = req.body.username;
    model.createUser(username, (response, code) => {
      res.status(code).send(response);
    });
  }
};
