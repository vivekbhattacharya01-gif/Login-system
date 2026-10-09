const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.error('Failed to connect to MongoDB');
    process.exit(1);
  }
};

module.exports = connectDB;