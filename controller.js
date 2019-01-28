"use strict";

const model = require("./model");

module.exports = {
  createUser: (req, res) => {
    const username = req.body.username;
    model.createUser(username, (response, code) => {
      res.status(code).send(response);
    });
  },
  getAllUsers: (req, res) => {
    model.getAllUsers((response, code) => {
      res.status(code).send(response);
    });
  },
  addExercise: (req, res) => {
    const userId = req.body.userId;
    const description = req.body.description;
    const duration = req.body.duration;
    const date = req.body.date || null;

    // Check request
    if (!description || !duration || !userId)
      return res.status(200).send({ message: "Required field(s) missing" });
    if (typeof description != "string")
      return res
        .status(200)
        .send({ message: "Invalid 'description' data format" });
    if (isNaN(duration))
      return res
        .status(200)
        .send({ message: "Invalid 'duration' data format" });
    if (parseInt(duration) < 1 || parseInt(duration) > 24 * 60)
      return res
        .status(200)
        .send({ message: "Exercise duration out of bounds (1 to 1440 min.)" });
    if (date && typeof date != "string")
      return res.status(200).send({ message: "Invalid 'date' data format" });

    const exercise = { description, duration };
    if (date) exercise.date = Date.parse(date);

    model.addExercise(userId, exercise, (response, code) => {
      res.status(code).send(response);
    });
  },
  getUserLog: (req, res) => {
    const userId = req.query.userId.toString();
    const from = Date.parse(req.query.from) || null;
    const to = Date.parse(req.query.to) || null;
    const limit = parseInt(req.query.limit) || null;

    const params = { from, to, limit };

    model.getUserLog(userId, params, (response, code) => {
      res.status(code).send(response);
    });
  }
};
