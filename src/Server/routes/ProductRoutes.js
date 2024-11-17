const express = require('express');
const { getProductsByCategory, getProductsByKeywords } = require('../controllers/ProductController');
const router = express.Router();

router.post('/get/category', getProductsByCategory);
router.post('/get/keywords', getProductsByKeywords);

module.exports = router;
