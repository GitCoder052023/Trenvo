const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/Checkout/:productId", (req, res) => {
    res.sendFile("templates/Payments/Payment.html", { root: path.join(__dirname, "../") })
})

module.exports = router