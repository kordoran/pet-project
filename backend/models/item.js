const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  user_id: { type: String, required: true, default: "default_string" },
  itemType: { type: String, required: true, default: "default_string" },
  artist: { type: String, required: true, default: "default_string" },
  albumTitle: { type: String, required: true, default: "default_string" },
  releaseYear: { type: String, required: true, default: "default_string" },
  recordLabel: { type: String, required: true, default: "default_string" },
  placeOfRelease: { type: String, required: true, default: "default_string" },
  price: { type: Number, required: true, default: 1234 },
  coverURL: { type: String, required: true, default: "default_string" },
  UPC: { type: Number, required: true, default: 1234 },
  dateOfUpdate: {
    type: Date,
    default: Date.now,
  },
  shippingAvailable: Boolean,
  personalExchangeAvailable: Boolean,
  isFrozen: { type: Boolean, default: false },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
