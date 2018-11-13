require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const isMongooseConnectionProvided = process.env.NODE_ENV === "integration";

if (!isMongooseConnectionProvided) {
  mongoose.connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true
    }
  );
  mongoose.set("useCreateIndex", true);

  const db = mongoose.connection;

  db.once("open", () => {
    console.log("Database is connected");
  });

  db.on("error", error => {
    console.error("An error has occur", error);
  });
}

app.listen(process.env.PORT, () => {
  console.log("Listening on port ", process.env.PORT);
});
