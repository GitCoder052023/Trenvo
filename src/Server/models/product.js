const { connectToDatabase } = require('../config/db');

async function getProductsByCategory(category) {
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

module.exports = { getProductsByCategory, getProductsByKeywords };
