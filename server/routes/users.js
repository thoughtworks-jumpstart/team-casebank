const User = require("../schemas/User");
const router = require("express").Router();

router.get("/", async (req, res) => {
  let users = await User.find({}).populate("projects", "name");
  res.status(200).json({ users });
});
module.exports = router;
