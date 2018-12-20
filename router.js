"use strict";

const router = require("express").Router();
const controller = require("./controller");

router.post("/new-user", controller.createUser);

module.exports = router;
