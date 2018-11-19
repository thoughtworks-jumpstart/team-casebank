const express = require("express");
const router = express.Router();
const Project = require("../schemas/Project");
// Cases API

router.get("/:projectId", async (req, res) => {
  let project = await Project.findOne({ _id: req.params.projectId })
    .populate("members", "name")
    .populate("main_tw_contact", "name");
  res.status(200).json(project);
});

router.get("/", async (req, res) => {
  let projects = await Project.find({}, "-description")
    .populate("members", "name")
    .populate("main_tw_contact", "name");
  res.status(200).json(projects);
});

module.exports = router;
