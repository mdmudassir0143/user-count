const mongoose = require("mongoose");

const Visitor = new mongoose.Schema({
  event_name: { type: String },
  count: {
    type: Number,
    default: 0,
  },
});

const VisitorModel = mongoose.model("VisitorModel", Visitor);

module.exports = VisitorModel;
