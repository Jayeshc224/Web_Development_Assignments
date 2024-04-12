const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  Company_Name: {
    type: String,
    required: true,
  },
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Salary: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Job", jobSchema);
