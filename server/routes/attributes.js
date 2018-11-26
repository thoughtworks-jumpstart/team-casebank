const express = require("express");
const router = express.Router();
const Attributes = require("../schemas/Property");

router.get("/", async (req, res) => {
  const attributes = await Attributes.find({});
  res.status(200).json(attributes);
});

module.exports = router;
