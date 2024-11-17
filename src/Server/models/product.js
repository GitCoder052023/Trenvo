const { connectToDatabase } = require('../config/db');

async function getProductsByCategory(category) {
    const db = await connectToDatabase();
    return db.collection('Products')
        .find({ productCategory: category })
        .toArray();
}

module.exports = { getProductsByCategory };