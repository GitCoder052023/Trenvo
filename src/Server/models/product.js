const { connectToDatabase } = require('../config/db');

async function getProductsByCategory(category) {
    const validCategories = ['Men', 'Women', 'Wearables', 'Accessories'];
    if (!validCategories.includes(category)) {
        throw new Error('Invalid category value');
    }

    const db = await connectToDatabase();
    return db.collection('Products')
        .find({ productCategory: category })
        .toArray();
}

async function getProductsByKeywords(keywords) {
    const db = await connectToDatabase();
    return db.collection('Products')
        .find({ 
            productKeywords: { 
                $in: Array.isArray(keywords) ? keywords : [keywords] 
            } 
        })
        .toArray();
}

async function getProductsByFeature(feature) {
    const validFeatures = ['NA', 'FP'];  
    if (!validFeatures.includes(feature)) {
        throw new Error('Invalid feature value');
    }
    
    const db = await connectToDatabase();
    return db.collection('Products')
        .find({ Feature: feature })
        .toArray();
}

module.exports = { 
    getProductsByCategory, 
    getProductsByKeywords,
    getProductsByFeature 
};
