require("dotenv").config();

module.exports = {
  development: process.env.MONGODB_URI,
  auto: process.env.MONGODB_URI,
  test: process.env.MONGODB_URI,
  production: process.env.MONGODB_URI
};
