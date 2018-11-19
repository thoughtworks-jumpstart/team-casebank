const express = require("express");
const router = express.Router();
const Project = require("../schemas/Project");
// Cases API

router.get("/", async (req, res) => {
  let projects = await Project.find({});
  res.status(200).json({
    projects
  });
});

module.exports = router;
