import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./api/user.route.js";

dotenv.config();

const App = express();
App.use(express.json());

await mongoose
  .connect(process.env.MONGODBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB", err));

App.get("/", (req, res) => {
  res.send("HELLOO");
});

App.use("/users", router);

const port = 5000;

App.listen(port, () => {
  console.log(`server is running on port, ${port}`);
});