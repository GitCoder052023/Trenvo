const express = require('express');
const { getProductsByCategory, getProductsByKeywords, getProductsByFeature, getProductById } = require('../controllers/ProductController');
const router = express.Router();

router.post('/get/category', getProductsByCategory);
router.post('/get/keywords', getProductsByKeywords);
router.post('/get/feature', getProductsByFeature);
router.get('/get/:id', getProductById);

module.exports = router;
