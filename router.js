"use strict";

const router = require("express").Router();
const controller = require("./controller");

router.post("/new-user", controller.createUser);
router.get("/users", controller.getAllUsers);

module.exports = router;
