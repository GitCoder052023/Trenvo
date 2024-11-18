const Product = require('../models/product')

async function getProductsByCategory(req, res) {
    try {
        const { category } = req.body;
        if (!category || typeof category !== 'string') {
            return res.status(400).json({ message: 'Category must be provided as a string' });
        }
        const products = await Product.getProductsByCategory(category);
        res.status(200).json(products);
    } catch (error) {
        if (error.message === 'Invalid category value') {
            return res.status(400).json({ message: 'Category must be one of: Men, Women, Wearables, Accessories' });
        }
        res.status(500).json({ message: 'Internal Server error', error: error.message });
    }
}

async function getProductsByKeywords(req, res) {
    try {
        const { keywords } = req.body;
        const products = await Product.getProductsByKeywords(keywords);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server error', error: error.message });
    }
}

async function getProductsByFeature(req, res) {
    try {
        const { feature } = req.body;
        if (!feature || typeof feature !== 'string') {
            return res.status(400).json({ message: 'Feature must be provided as a string' });
        }
        const products = await Product.getProductsByFeature(feature);
        res.status(200).json(products);
    } catch (error) {
        if (error.message === 'Invalid feature value') {
            return res.status(400).json({ message: 'Feature must be one of: NA, FP, SBC' });
        }
        res.status(500).json({ message: 'Internal Server error', error: error.message });
    }
}

module.exports = { 
    getProductsByCategory, 
    getProductsByKeywords,
    getProductsByFeature 
};

