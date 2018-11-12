const express = require('express');
const app = express();
const mongoose = require("mongoose");
const path = require("path");
require('dotenv').config();

const isMongooseConnectionProvided = process.env.NODE_ENV === "integration";

if (!isMongooseConnectionProvided) {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  });
  mongoose.set('useCreateIndex', true);

  const db = mongoose.connection;

  db.once("open", () => {
    console.log("Database is connected");
  });

  db.on("error", error => {
    console.error("An error has occur", error);
  });

}

const staticFiles = express.static(path.join(__dirname, "../client/build"));
app.use(staticFiles);

app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({
    message: "Welcome to casebank project"
  })
})


module.exports = app;