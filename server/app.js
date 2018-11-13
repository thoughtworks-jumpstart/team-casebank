const express = require("express");
const app = express();
const path = require("path");

const staticFiles = express.static(path.join(__dirname, "../client/build"));
app.use(staticFiles);

const caseRouter = require("./routes/cases");

app.use(express.json());

app.use("/cases", caseRouter);

module.exports = app;
