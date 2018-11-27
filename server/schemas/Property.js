const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  attribute: String,
  list: [mongoose.Mixed]
});

module.exports = mongoose.model("Property", PropertySchema);
