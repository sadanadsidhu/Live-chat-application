const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes=require("./routes/auth")
const app = express();
require("dotenv").config();

////midleware-----------------------
app.use(cors());
app.use(express.json());

app.use("api/auth/",authRoutes)
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });
const server = app.listen(5000, () => {
  console.log("server is runnig......");
});
