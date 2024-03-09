import mongoose from 'mongoose';

const ConnectDB = async () => {
  try {
    // const conn = await mongoose.connect(`${process.env.MONGO_URI}`);
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/eezePG")
  } catch (error) {
    console.error(`Error in dbConnection: ${error.message}`);
    process.exit(1);
  }
};

export  {ConnectDB};