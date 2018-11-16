const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  category: String,
  name: [String]
});

PropertySchema.index({ category: 1, name: 1 }, { unique: true });
module.exports = mongoose.model("Property", PropertySchema);
