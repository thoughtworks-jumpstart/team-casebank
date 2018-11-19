const User = require("../schemas/User");
const router = require("express").Router();

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
module.exports = router;
