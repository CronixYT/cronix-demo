const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rjcodeSchema = new Schema({
  rjcode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  url: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  sfw: {
    type: Boolean
  }
});

const Rjcode = mongoose.model("rjcode", rjcodeSchema);

module.exports = Rjcode;
