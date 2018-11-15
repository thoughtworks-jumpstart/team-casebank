const mongoose = require("mongoose");

const CaseSchema = new mongoose.Schema({
  name: { type: String },
  client: { type: String },
  nda: { type: String },
  description: { type: String },
  main_tw_contact: { type: mongoose.Types.ObjectId, ref: "Property" },
  techstack: [{ type: mongoose.Types.ObjectId, ref: "Techstack" }],
  year: { type: Number },
  status: { type: String },
  region: { type: mongoose.Types.ObjectId, ref: "Property" },
  country: { type: mongoose.Types.ObjectId, ref: "Property" },
  office: { type: mongoose.Types.ObjectId, ref: "Property" },
  industry: { type: mongoose.Types.ObjectId, ref: "Property" },
  phase: { type: mongoose.Types.ObjectId, ref: "Property" },
  members: [{ type: mongoose.Types.ObjectId, ref: "Property" }],
  tag: { type: mongoose.Types.ObjectId, ref: "Property" }
});

module.exports = mongoose.model("Case", CaseSchema);
