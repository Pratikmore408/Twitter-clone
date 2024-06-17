import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import connectMongoDB from "./database/connectMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// console.log(process.env.MON);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("server is ready");
});

app.listen(PORT, () => {
  console.log(`server is up and runing on port ${PORT}`);
  connectMongoDB();
});
