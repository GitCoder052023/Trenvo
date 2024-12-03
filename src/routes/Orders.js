const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/:userId?", (req, res) => {
    res.sendFile("templates/Orders/Orders.html", { root: path.join(__dirname, "../") })
})

router.get("/Track/:userId?", (req, res) => {
    res.sendFile("templates/Orders/TrackOrders.html", { root: path.join(__dirname, "../") })
})

module.exports = router