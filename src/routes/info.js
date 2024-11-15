const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/About", (req, res) => {
  res.sendFile("templates/info/About.html", { root: path.join(__dirname, "../") });
});

router.get("/Contact", (req, res) => {
  res.sendFile("templates/info/Contact.html", { root: path.join(__dirname, "../") });
});

router.get("/Contact/Success", (req, res) => {
  res.sendFile("templates/info/Request_Success.html", { root: path.join(__dirname, "../") });
});

module.exports = router;