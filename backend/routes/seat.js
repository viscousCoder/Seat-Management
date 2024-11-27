const express = require("express");

const { getSeats, resetSeats } = require("../controller/seat");
const router = express.Router();

// reset all
router.post("/", resetSeats);
// get all
router.get("/", getSeats);

//pending
router.post("/pending");

//rest all
router.post("/book", (req, res) => {});

module.exports = router;
