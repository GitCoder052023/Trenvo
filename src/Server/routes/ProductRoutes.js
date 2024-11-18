const express = require('express');
const { getProductsByCategory, getProductsByKeywords, getProductsByFeature } = require('../controllers/ProductController');
const router = express.Router();

router.post('/get/category', getProductsByCategory);
router.post('/get/keywords', getProductsByKeywords);
router.post('/get/feature', getProductsByFeature);

module.exports = router;
