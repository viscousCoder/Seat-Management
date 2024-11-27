const express = require("express");
const { createUser, checkUser } = require("../controller/user");

const router = express.Router();
// console.log("here");

router.post("/register", createUser);
router.post("/login", checkUser);

module.exports = router;
