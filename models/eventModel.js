const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    isPresent: {
      type: Boolean,
      default: false,
      required: true,
    },
    feedback: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    dept: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      minimum: 1,
      maximum: 8,
      required: true,
    },
  },
  { timestamps: true }
);

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    venue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "venue",
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    fees: {
      type: Number,
      minimum: 0,
      required: true,
    },
    attendance: [attendanceSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("events", eventSchema);
