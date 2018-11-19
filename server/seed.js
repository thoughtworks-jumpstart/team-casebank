require("dotenv").config();

module.exports = {
  development: process.env.MONGODB_URI,
  testing: process.env.MONGODB_URI,
  production: process.env.MONGODB_URI
};
