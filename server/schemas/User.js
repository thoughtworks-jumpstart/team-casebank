const mongoose = require("mongoose");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  name: { type: String, index: true },
  email: { unique: true },
  passwordSalt: String,
  passwordHash: String,
  // clearance: String,
  techstack: [String],
  role: String,
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Case" }]
});

function generateSalt() {
  return crypto.randomBytes(16).toString("hex");
}

function hashPassword(password, salt) {
  return crypto
    .pbkdf2Sync(password, salt, 10000, 512, "sha512")
    .toString("hex");
}

UserSchema.methods.setPassword = function(password) {
  this.passwordSalt = generateSalt();
  this.passwordHash = hashPassword(password, this.passwordSalt);
};

UserSchema.methods.validPassword = function(password) {
  return this.passwordHash === hashPassword(password, this.passwordSalt);
};

module.exports = mongoose.model(UserSchema);
