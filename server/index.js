import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";

import { UserRoutes } from "./routes/userroutes.js";
import { PostRoute } from "./routes/postroutes.js";
const app = express();
app.use(express.json());
app.use(cors());
config();
app.use("/user", UserRoutes);
app.use("/post", PostRoute);

app.listen(process.env.PORT, () => {
  console.log(` the server is running on this ${process.env.PORT}`);
  mongoose.connect(process.env.MONGO_URL);
  console.log("database connect success fully");
});
