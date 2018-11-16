const crypto = require("crypto");

const users = [
  {
    _id: "001",
    name: "John Mayer",
    role: "Developer",
    techstack: ["javascript", "python"],
    projects: ["sleep-app", "pokemo-app", "to-do-list"],
    passwordSalt: "",
    passwordHash: ""
  },
  {
    _id: "002",
    name: "Mary Lamb",
    role: "Developer",
    techstack: ["javascript", "html"],
    projects: ["react-app", "todo", "feedback"],
    passwordSalt: "",
    passwordHash: ""
  },
  {
    _id: "003",
    name: "Vlad",
    role: "Developer",
    techstack: ["python", "ruby"],
    projects: ["airline", "e-commerce", "appstore"],
    passwordSalt: "",
    passwordHash: ""
  },
  {
    _id: "004",
    name: "James",
    role: "Developer",
    techstack: ["php", "python"],
    projects: ["shipping", "accounting"],
    passwordSalt: "",
    passwordHash: ""
  },
  {
    _id: "005",
    name: "Daniel",
    role: "Developer",
    techstack: ["Java", "c++"],
    projects: ["freshfood", "beverage"],
    passwordSalt: "",
    passwordHash: ""
  }
];

function generateSalt() {
  return crypto.randomBytes(16).toString("hex");
}

function hashPassword(password, salt) {
  return crypto
    .pbkdf2Sync(password, salt, 10000, 512, "sha512")
    .toString("hex");
}

for (let user of users) {
  user.passwordSalt = generateSalt();
  user.passwordHash = hashPassword("password", user.passwordSalt);
}

module.exports = users;
