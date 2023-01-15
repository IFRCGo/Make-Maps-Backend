const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
//const TestModel = require("./models/Test.model.js");
dotenv.config();
var cors = require("cors");

//connectDB();

app.use(express.json()); // we add this line to allow our application to accept JSON Data

app.use(
  cors({
    origin: process.env.origin,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  console.log("req");
  res.send("API is running");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on PORT ${PORT}...`));
