import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDb Connected !! DB Host : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDb connection failed : ", error);
    process.exit(1);
  }
};

export default connectDB;

// import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";

// const connectDB = async () => {
//   await mongoose.connect(process.env.MONGODB_URI + "/" + DB_NAME, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   });
//   console.log("MongoDb Connected!");
// };

// export default connectDB;
