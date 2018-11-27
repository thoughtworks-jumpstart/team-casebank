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
  const email = req.body.user.email;
  const password = req.body.user.password;
  if (!email || !password) {
    return res.status(status.UNAUTHORIZED).json({
      message: "Email and Password are required for login"
    });
  }
  let user = await User.findOne({ email });
  if (!user || !user.validPassword(password)) {
    return res
      .status(status.UNAUTHORIZED)
      .json({ message: "Email or Password is invalid" });
  }
  const token = user.generateJWT();
  res.cookie("jwt", token, {
    httpOnly: true
  });
  return res.json({ user: { email: user.email, name: user.name } });
});

router.post("/logout", async (req, res) => {
  res.clearCookie("jwt");
  res.json({ status: "done" });
});

module.exports = router;
