const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
