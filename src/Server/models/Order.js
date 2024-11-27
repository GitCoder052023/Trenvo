const { connectToDatabase } = require('../config/db');
const { ObjectId } = require('mongodb');
const { getOrder } = require('../controllers/OrdersController');
const COLLECTION_NAME = 'Orders';

async function createOrder(orderData) {
  const db = await connectToDatabase();
  return db.collection(COLLECTION_NAME).insertOne(orderData);
}

async function getOrderById(orderId) {
  const db = await connectToDatabase();
  return db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(orderId) });
}

async function getAllOrders() {
  const db = await connectToDatabase();
  return db.collection(COLLECTION_NAME).find({}).toArray();
}

async function updateOrderStatus(orderId, statusUpdates) {
  const db = await connectToDatabase();
  return db.collection(COLLECTION_NAME).updateOne(
    { _id: new ObjectId(orderId) },
    { $set: statusUpdates }
  );
}

async function deleteOrder(orderId) {
  const db = await connectToDatabase();
  return db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(orderId) });
}

async function getOrdersByUserId(userId) {
  const db = await connectToDatabase();
  return db.collection(COLLECTION_NAME).find({ 'customer.userId': userId }).toArray();
}

module.exports = {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  getOrdersByUserId
};
