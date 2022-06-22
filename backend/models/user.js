const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemType: { type: String, required: true },
  artist: { type: String, required: true },
  albumTitle: { type: String, required: true },
  releaseYear: { type: String, required: true },
  recordLabel: { type: String, required: true },
  placeOfRelease: { type: String, required: true },
  UPC: { type: Number, required: true },
  dateOfUpdate: {
    type: Date,
  },
  shippingAvailable: Boolean,
  personalExchangeAvailable: Boolean,
  isFrozen: { type: Boolean, default: false },
});

const userSchema = new mongoose.Schema({
  username: { type: String }, //empty string is not enough
  providers: {
    google: { type: String, sparse: true, unique: true },
  },
  items: [itemSchema], // empty list is default?
  currentCity: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
