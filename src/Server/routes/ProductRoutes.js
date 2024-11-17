const express = require('express');
const { getProductsByCategory } = require('../controllers/ProductController');
const router = express.Router();

router.post('/get/category', getProductsByCategory);

module.exports = router;