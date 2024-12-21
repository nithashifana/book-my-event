const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const venueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      unique: true,
    },
    events: [
      {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "events",
      },
    ],
    maxCapacity: {
      type: Number,
      default: 100,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("venue", venueSchema);
