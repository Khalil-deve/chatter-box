import './dns-config.js'; // Must be imported before mongoose
import mongoose from 'mongoose';

const connectDB = async () => {
  const connectionOptions = {
    connectTimeoutMS: 30000, // Longer timeout
  socketTimeoutMS: 60000,  // 1min for complex queries
  retryWrites: true,       // Auto-retry writes
  retryReads: true         // Auto-retry reads
   
  };

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, connectionOptions);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB Connection Failed:', error.message);
    console.error('Full Error:', error);
    process.exit(1);
  }
};

export default connectDB;