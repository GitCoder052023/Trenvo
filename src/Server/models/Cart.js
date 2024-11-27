const { connectToDatabase } = require('../config/db');
const COLLECTION_NAME = 'Cart';

async function createCart(userId) {
  const db = await connectToDatabase();
  const cartData = {
    userId,
    products: [],
    addedAt: new Date()
  };
  return db.collection(COLLECTION_NAME).insertOne(cartData);
}

async function addProductToCart(userId, productData) {
  const db = await connectToDatabase();
  return db.collection(COLLECTION_NAME).updateOne(
    { userId },
    { $push: { products: productData } },
    { upsert: true }
  );
}

async function getCartByUserId(userId) {
  const db = await connectToDatabase();
  return db.collection(COLLECTION_NAME).findOne({ userId });
}

async function updateProductInCart(userId, productIndex, updateData) {
    const db = await connectToDatabase();
    return db.collection(COLLECTION_NAME).updateOne(
        { userId },
        { $set: updateData }
    );
}


async function removeProductFromCart(userId, productIndex) {
  const db = await connectToDatabase();
  return db.collection(COLLECTION_NAME).updateOne(
    { userId },
    { $unset: { [`products.${productIndex}`]: 1 } }
  );
}

async function clearCart(userId) {
  const db = await connectToDatabase();
  return db.collection(COLLECTION_NAME).updateOne(
    { userId },
    { $set: { products: [] } }
  );
}

module.exports = {
  createCart,
  addProductToCart,
  getCartByUserId,
  updateProductInCart,
  removeProductFromCart,
  clearCart
};
