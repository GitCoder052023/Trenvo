const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/:productId", (req, res) => {
    res.sendFile("templates/Shop/Collections/Product/Product.html", { root: path.join(__dirname, "../") })
})

module.exports = router
