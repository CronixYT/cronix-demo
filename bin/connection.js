const mongoose = require("mongoose");
// Require config
const { password } = require("./config/config");

module.exports.start = function() {
  mongoose.connect(
    `mongodb://localhost:27017/hvdb`,
    { useCreateIndex: true, useNewUrlParser: true }
  );

  mongoose.connection
    .on("open", () => {
      console.log("Connected to the database!");
    })
    .on("error", err => console.log(err));
};
