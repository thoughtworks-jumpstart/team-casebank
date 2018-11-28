const express = require("express");
const router = express.Router();
const Attributes = require("../schemas/Property");

router.get("/", async (req, res) => {
  const attributes = await Attributes.find({});
  res.status(200).json(attributes);
});

router.post("/new", async (req, res) => {
  try {
    const attribute = await Attributes.findOne({
      attribute: req.body.attribute
    });
    attribute.list.push(req.body.option);
    await attribute.save();
    res.status(201).json(attribute);
  } catch (err) {
    res.status(200).json({ error: err });
  }
});
module.exports = router;
