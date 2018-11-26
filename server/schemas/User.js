const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserSchema = new mongoose.Schema({
  name: { type: String, index: true },
  img: String,
  joindate: String,
  office: String,
  email: { type: String, unique: true },
  passwordSalt: String,
  passwordHash: String,
  // clearance: String,
  techstack: [String],
  role: String,
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }]
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

UserSchema.methods.generateJWT = function() {
  return jwt.sign(
    {
      userid: this._id,
      email: this.email
    },
    getJWTSigningSecret()
  );
};

function getJWTSigningSecret() {
  const secret = process.env.JWT_SIGNING_SECRET;
  if (!secret) {
    throw new Error("Secret retrieval has error");
  }
  return secret;
}

module.exports = mongoose.model("User", UserSchema);
