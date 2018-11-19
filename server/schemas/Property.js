const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  attribute: String,
  list: [String]
});

module.exports = mongoose.model("Property", PropertySchema);
