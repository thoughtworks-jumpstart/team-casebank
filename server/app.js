const express = require("express");
const app = express();
const path = require("path");

const staticFiles = express.static(path.join(__dirname, "../client/build"));
app.use(staticFiles);

app.use(express.json());

// Routes
const projectRouter = require("./routes/projects");
const userRouter = require("./routes/users");
const attributeRouter = require("./routes/attributes");
app.use("/projects", projectRouter);
app.use("/users", userRouter);
app.use("/attributes", attributeRouter);

//To resolve React-Router client side routing. Put all API calls above this route!
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});


module.exports = app;
