var mongoose = require("mongoose");

const practiceSchema = new mongoose.Schema({
  Name: {
    type: String,
  },
  Password: {
    type: String,
  },
});

const Practice = mongoose.model("Practice", practiceSchema);

module.exports = Practice;
