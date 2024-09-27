import mongoose from "mongoose";

const connectToMogodb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to database");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectToMogodb;
