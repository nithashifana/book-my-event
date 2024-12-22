const eventModel = require("../models/eventModel");
const userModel = require("../models/userModel");
const venueModel = require("../models/venueModel");
const compareDate = require("../Util/compareDate");
const compareTime = require("../Util/compareTime");
const formatDate = require("../Util/formatDate");
const formatTime = require("../Util/formatTime");
const isVenueFree = require("../Util/isVenueFree");
const samedate = require("../Util/samedate");
const sameTime = require("../Util/sameTime");

module.exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      startingTime,
      endingTime,
      venue,
      capacity,
      organizer,
      tags,
      fees,
    } = req.body;

    if (
      !title ||
      !description ||
      !date ||
      !startingTime ||
      !endingTime ||
      !venue ||
      !capacity ||
      !organizer ||
      !tags ||
      !fees
    ) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    const id = req.user.id;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    if (user.role === "student") {
      return res.status(400).json({ message: "U cant create" });
    }

    const ven = await venueModel.findOne({ name: venue });
    if (!ven) {
      return res.status(400).json({ message: "venue not present" });
    }
    const venId = ven._id;
    const code = await userModel.findOne({ code: organizer });
    if (!code) {
      return res.status(400).json({ message: "organizer not present" });
    }

    if (!(await isVenueFree(ven.name, date, startingTime, endingTime))) {
      return res.status(400).json({ message: "Venue is not free" });
    }

    if (ven.maxCapacity < capacity) {
      return res
        .status(400)
        .json({ message: `Max capacity is ${ven.maxCapacity}` });
    }

    const newEvent = new eventModel({
      title: title,
      description: description,
      date: date,
      startTime: startingTime,
      endTime: endingTime,
      venue: venId,
      capacity: capacity,
      organizer: code._id,
      tags: tags,
      fees: fees,
    });

    await newEvent.save();
    return res.status(201).json({ message: "Event created succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ messsage: "Internal server error" });
  }
};

module.exports.deleteEvent = async (req, res) => {
  try {
    const id = req.user.id;
    const { eventId } = req.params;
    if (!id) {
      return res.status(400).json({ message: "id required" });
    }

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    if (user.role === "student") {
      return res.status(400).json({ message: "U cant delete" });
    }

    const now = new Date();
    const formattedDate = formatDate(now);
    const formattedTime = formatTime(now);
    const event = await eventModel.findById(eventId);
    if (!event) {
      return res.status(400).json({ message: "Event doesnot exist" });
    }
    const startTime = event.startTime;
    if (!compareDate(formattedDate, event.date)) {
      if (!compareTime(formattedTime, event.startTime))
        return res.status(400).json({ message: "Event is over" });
    }

    const existevent = await eventModel.findByIdAndDelete(eventId);
    if (!existevent) {
      return res.status(400).json({ message: "Event doesnot exist" });
    }

    return res.status(400).json({ message: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.updateEvent = async (req, res) => {
  try {
    let {
      title,
      description,
      date,
      startingTime,
      endingTime,
      venue,
      capacity,
      tags,
      fees,
    } = req.body;

    const id = req.user.id;
    const { eventId } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    if (user.role === "student") {
      return res.status(400).json({ message: "U cant update" });
    }

    const event = await eventModel.findById(eventId);
    if (!event) {
      return res.status(400).json({ message: "Event not present" });
    }
    const Existven = await venueModel.findById(event.venue);

    title = title || event.title;
    description = description || event.description;
    date = date || event.date;
    startingTime = startingTime || event.startTime;
    endingTime = endingTime || event.endTime;
    venue = venue || Existven.name;
    capacity = capacity || event.capacity;
    tags = tags || event.tags;
    fees = fees || event.fees;

    const ven = await venueModel.findOne({ name: venue });
    if (!ven) {
      return res.status(400).json({ message: "venue not present" });
    }

    if (
      !(await isVenueFree(ven.name, date, startingTime, endingTime, event._id))
    ) {
      return res.status(400).json({ message: "Venue is not free" });
    }

    event.title = title;
    event.description = description;
    event.date = date;
    event.startTime = startingTime;
    event.endTime = endingTime;
    event.venue = ven._id;
    event.capacity = capacity;
    event.tags = tags;
    event.fees = fees;

    await event.save();
    return res.status(201).json({ message: "Event updated succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ messsage: "Internal server error" });
  }
};

module.exports.getEventDetails = async (req, res) => {
  try {
    const { eventId } = req.params;
    const existEvent = await eventModel.findById(eventId);
    if (!existEvent) {
      return res.status(400).json({ message: "Event doesnot exist" });
    }
    return res.status(200).json({ message: existEvent });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ messsage: "Internal server error" });
  }
};

module.exports.getAllEventDetails = async (req, res) => {
  try {
    const existEvent = await eventModel.find();
    if (!existEvent) {
      return res.status(400).json({ message: "Event doesnot exist" });
    }
    return res.status(200).json({ message: existEvent });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ messsage: "Internal server error" });
  }
};

module.exports.regEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId } = req.params;
    const { id, name, email, dept, year } = req.body;

    if (!id || !name || !email || !dept || !year) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }
    const existEvent = await eventModel.findById(eventId);
    if (!existEvent) {
      return res.status(400).json({ message: "Event doesnot exist" });
    }

    const user = await userModel.findById(userId);
    if (!user || user.role !== "student") {
      return res.status(400).json({ message: "U cant reg" });
    }

    const existingUser = existEvent.attendance.find(
      (attendee) => attendee.id.toString() === userId.toString()
    );
    if (existingUser) {
      return res.status(400).json({ message: "Already registered" });
    }

    existEvent.attendance.push({
      id: userId,
      name: name,
      email: email,
      dept: dept,
      year: year,
    });

    await existEvent.save();

    return res.status(201).json({ message: "Registered succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

module.exports.deleteReg = async (req, res) => {
  try {
    const id = req.user.id;
    const { eventId } = req.params;

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    const existEvent = await eventModel.findById(eventId);
    if (!existEvent) {
      return res.status(400).json({ message: "Event doesnot exist" });
    }
    existEvent.attendance = existEvent.attendance.filter(
      (attendee) => attendee.id.toString() !== id.toString()
    );
    await existEvent.save();
    return res.status(200).json({ message: "Deleted succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Inernal server error" });
  }
};

module.exports.attendanceEvent = async (req, res) => {
  try {
    const id = req.user.id;
    const { eventId } = req.params;
    const { feedback } = req.body;

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const existEvent = await eventModel.findById(eventId);
    if (!existEvent) {
      return res.status(400).json({ message: "Event doesnot exist" });
    }
    const now = new Date();
    const formattedDate = formatDate(now);
    const formattedTime = formatTime(now);
    if (!samedate(formattedDate, existEvent.date)) {
      if (!sameTime(formattedTime, existEvent.startTime, existEvent.endTime)) {
        return res.status(400).json({ message: "Time over" });
      }
    }
    await eventModel.findOneAndUpdate(
      { _id: eventId, "attendance.id": id },
      { $set: { "attendance.$.isPresent": true } },
      { new: true }
    );
    await eventModel.findOneAndUpdate(
      { _id: eventId, "attendance.id": id },
      { $set: { "attendance.$.feedback": feedback } },
      { new: true }
    );
    return res.status(200).json({ message: "Attendance marked" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Inernal server error" });
  }
};

module.exports.getAttendance = async (req, res) => {
  try {
    const id = req.user.id;
    const { eventId } = req.params;

    const user = await userModel.findById(id);
    if (!user || user.role === "student") {
      return res.status(400).json({ message: "You cant get" });
    }

    const event = await eventModel.findById(eventId);
    if (!event) {
      return res.status(400).json({ message: "Event not found" });
    }

    res
      .status(200)
      .json({ message: "Attendance fetched", attendance: event.attendance });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
