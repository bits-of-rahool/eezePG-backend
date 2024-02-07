import mongoose from 'mongoose';


const ConnectDB = async () => {
  try {

    const conn = await mongoose.connect(`${process.env.MONGO_URI}`);
  
    console.log("Database Connected")
  } catch (error) {
    console.error(`Error in dbConnection: ${error.message}`);
    process.exit(1);
  }
};
export  {ConnectDB};