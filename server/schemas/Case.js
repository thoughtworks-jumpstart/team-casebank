const mongoose = require("mongoose");

const CaseSchema = new mongoose.Schema({
  name: { type: String },
  client: { type: String },
  nda: { type: String },
  description: { type: String },
  main_tw_contact: { type: mongoose.Types.ObjectId, ref: "User" },
  techstack: [{ type: String }],
  year: { type: Number },
  status: { type: String },
  office: { type: String },
  industry: { type: String },
  phase: { type: String },
  members: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  tag: { type: String }
});

module.exports = mongoose.model("Case", CaseSchema);
