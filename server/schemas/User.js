const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { unique: true },
  passwordSalt: String,
  passwordHash: String
});
