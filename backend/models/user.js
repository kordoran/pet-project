const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String }, //empty string is not enough
  providers: {
    google: { type: String, sparse: true, unique: true },
  },
  currentCity: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
