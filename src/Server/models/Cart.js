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
  
  // Check if product with same name and size exists
  const existingCart = await db.collection(COLLECTION_NAME).findOne({
    userId,
    'products': {
      $elemMatch: {
        'name': productData.name,
        'size': productData.size
      }
    }
  });

  if (existingCart) {
    // Product exists with same name and size, update quantity
    return db.collection(COLLECTION_NAME).updateOne(
      { 
        userId,
        'products': {
          $elemMatch: {
            'name': productData.name,
            'size': productData.size
          }
        }
      },
      { 
        $inc: { 
          'products.$.quantity': productData.quantity 
        }
      }
    );
  } else {
    // Product doesn't exist or has different size, add new product
    return db.collection(COLLECTION_NAME).updateOne(
      { userId },
      { $push: { products: productData } },
      { upsert: true }
    );
  }
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

async function getCartWithSummary(userId) {
  const db = await connectToDatabase();
  const cart = await db.collection(COLLECTION_NAME).findOne({ userId });
  
  if (!cart) return null;

  // Calculate summary
  let total = 0;
  const summaryItems = {};

  cart.products.forEach(product => {
    const amount = product.price * product.quantity;
    total += amount;
    
    // Group by product name
    if (summaryItems[product.name]) {
      summaryItems[product.name].quantity += product.quantity;
      summaryItems[product.name].amount += amount;
    } else {
      summaryItems[product.name] = {
        quantity: product.quantity,
        amount: amount
      };
    }
  });

  // Format summary lines
  const summary = Object.entries(summaryItems).map(([name, details]) => {
    return `${name} (${details.quantity}): ₹${details.amount}`;
  });

  return {
    cart,
    summary,
    total: `₹${total}`
  };
}


module.exports = {
  createCart,
  addProductToCart,
  getCartByUserId,
  updateProductInCart,
  removeProductFromCart,
  clearCart,
  getCartWithSummary
};
