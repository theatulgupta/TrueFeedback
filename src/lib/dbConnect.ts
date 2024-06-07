import mongoose from 'mongoose';

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log('====================================');
    console.log('Database is already connected!');
    console.log('====================================');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || '', {});

    connection.isConnected = db.connections[0].readyState;

    console.log('====================================');
    console.log('Database is connected successfully!');
    console.log('====================================');
  } catch (error) {
    console.log('====================================');
    console.log('Database connection failed! Error: ' + error);
    console.log('====================================');
    process.exit();
  }
}

export default dbConnect;
