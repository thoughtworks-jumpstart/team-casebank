const User = require("../schemas/User");
const router = require("express").Router();
const status = require("http-status");

router.get("/:userId", async (req, res) => {
  let user = await User.findOne({ _id: req.params.userId }).populate(
    "projects",
    "name"
  );
  res.status(200).json(user);
});
router.get("/", async (req, res) => {
  let users = await User.find({}).populate("projects", "name");
  res.status(200).json(users);
});

router.post("/login", async (req, res) => {
  console.log("we are in the login---");
  const email = req.body.user.email;
  const password = req.body.user.password;
  console.log(`email-${email} and password-${password}`);
  if (!email || !password) {
    return res.status(status.UNAUTHORIZED).json({
      message: "email and password are required for login"
    });
  }
  let user = await User.findOne({ email });
  console.log(`user found ${user.name}`);
  if (!user || !user.validPassword(password)) {
    return res
      .status(status.UNAUTHORIZED)
      .json({ message: "email or password is invalid" });
  }
  const token = user.generateJWT();
  res.cookie("jwt", token, {
    httpOnly: true
  });
  return res.json({ user: { email: user.email, name: user.name } });
});

module.exports = router;
