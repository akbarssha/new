const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      type: String,
      
    },
    cuisine: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    menu: [
      {
        item: String,
        price: Number
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("restaurant", restaurantSchema);
