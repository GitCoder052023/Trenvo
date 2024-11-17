const { connectToDatabase } = require('../config/db');
const { ObjectId } = require('mongodb');
const COLLECTION_NAME = 'Users';

async function createUser(userData) {
  const db = await connectToDatabase();
  return db.collection(COLLECTION_NAME).insertOne(userData);
}

async function getUserByEmail(email) {
  const db = await connectToDatabase();
  return db.collection(COLLECTION_NAME).findOne({ email });
}

async function getUserById(userId) {
  const db = await connectToDatabase();
  return db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(userId) });
}

async function updateUserById(userId, updateData) {
  const db = await connectToDatabase();
  return db.collection(COLLECTION_NAME).updateOne(
    { _id: new ObjectId(userId) },
    { $set: updateData }
  );
}

module.exports = { getUserByEmail, createUser, getUserById, updateUserById };
