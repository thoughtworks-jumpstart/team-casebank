const express = require("express");
const router = express.Router();
const Project = require("../schemas/Project");
const User = require("../schemas/User");
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

router.post("/", async (req, res) => {
  try {
    let project = new Project(req.body);
    await project.save();
    if (req.body.main_tw_contact) {
      let user = await User.findById(req.body.main_tw_contact);
      user.projects.push(project._id);
      await user.save();
    }
    if (req.body.members.length) {
      for (let id of req.body.members) {
        if (id !== req.body.main_tw_contact) {
          let user = await User.findOne({ _id: id });
          user.projects.push(project._id);
          await user.save();
        }
      }
    }
    return res.status(201).json(project);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});
module.exports = router;
