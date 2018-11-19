const ObjectID = require("mongodb").ObjectID;
const crypto = require("crypto");
const users = require("./Users");
const projects = require("./Cases");

function generateSalt() {
  return crypto.randomBytes(16).toString("hex");
}

function hashPassword(password, salt) {
  return crypto
    .pbkdf2Sync(password, salt, 10000, 512, "sha512")
    .toString("hex");
}

for (let user of users) {
  user._id = new ObjectID();
  user.passwordSalt = generateSalt();
  user.passwordHash = hashPassword("password", user.passwordSalt);
}

for (let project of projects) {
  project._id = new ObjectID();
  project.main_tw_contact = {
    $id: users.filter(object => object.name === project.main_tw_contact)[0]._id,
    $ref: "User"
  };
  for (let i = 0; i < project.members.length; i++) {
    project.members[i] = {
      $id: users.filter(object => object.name === project.members[i])[0]._id,
      $ref: "User"
    };
  }
}

for (let user of users) {
  for (let i = 0; i < user.projects.length; i++) {
    user.projects[i] = {
      $id: projects.filter(project => project.name === user.projects[i])[0]._id,
      $ref: "Case"
    };
  }
}

module.exports = { users, projects };
