// require("dotenv").config({ path: "./env" });

// import mongoose, { connect } from "mongoose";
// import { DB_NAME } from "./constants";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at Port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Monogodb connection error");
  });

import express from "express";

// const app = express();
// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}}`);
//     app.on("error", (error) => {
//       console.log("ERROR : ", error);
//       throw error;
//     });

//     app.listen(process.env.PORT, () => {
//       console.log(`App is listening on the ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.log("Error : ", error);
//     throw error;
//   }
// })();
