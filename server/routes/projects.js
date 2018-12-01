const express = require("express");
const router = express.Router();
const Project = require("../schemas/Project");
const User = require("../schemas/User");
const {
  parseForImageUrls,
  uploadImages,
  replaceImageUrls
} = require("../cloudinaryUtils/parser");
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

router.put("/:projectId", async (req, res) => {
  try {
    let project = await Project.findById(req.params.projectId);
    //Delete projects from member profiles if they are removed
    for (let member of project.members) {
      let user = await User.findById(member);
      user.projects.pull(project._id);
      await user.save();
    }
    let user = await User.findById(req.body.main_tw_contact);
    user.projects.pull(project._id);
    await user.save();
    //Get all the image urls from the description
    const externalUrls = parseForImageUrls(req.body.description);
    //Pass the image urls to cloudinary and get the new urls
    const internalUrls = await uploadImages(externalUrls);
    //Replace external urls in html with the new url
    for (let key in req.body) {
      project[key] = req.body[key];
    }
    project.description = replaceImageUrls(req.body.description, internalUrls);
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
    res.status(200).json(project);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

router.post("/", async (req, res) => {
  try {
    let project = new Project(req.body);
    const externalUrls = parseForImageUrls(req.body.description);
    const internalUrls = await uploadImages(externalUrls);
    console.log("Internalurls", internalUrls);
    project.description = replaceImageUrls(req.body.description, internalUrls);
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
