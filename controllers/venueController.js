const venueModel = require("../models/venueModel");
const userModel = require("../models/userModel");

module.exports.create = async (req, res) => {
  try {
    const { name, location, maxCapacity } = req.body;
    if (!name || !location || !maxCapacity) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }
    const existingVenue = await venueModel.findOne({ name });
    if (existingVenue) {
      return res.status(400).json({ message: "Venue already exists" });
    }
    const newVenue = new venueModel({
      name,
      location,
      maxCapacity,
    });
    await newVenue.save();
    return res.status(201).json({ message: "venue created succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ messsage: "Internal server error" });
  }
};

module.exports.update = async (req, res) => {
  try {
    const { venueId } = req.params;
    const { name, maxCapacity } = req.body;

    const id = req.user.id;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    if (user.role === "student") {
      return res.status(400).json({ message: "U cant update" });
    }
    const existvenue = await venueModel.findById(venueId);
      if (!existvenue) {
        return res.status(400).json({ message: "Venue doesnot exist" });
      }

      existvenue.name = name || existvenue.name;
      existvenue.maxCapacity = maxCapacity || existvenue.maxCapacity;

      await existvenue.save();
      return res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ messsage: "Internal server error" });
  }
};

module.exports.getDetail = async (req, res) => {
  try {
    const existvenue = await venueModel.findById(venueId);
    if (!existvenue) {
      return res.status(400).json({ message: "Venue doesnot exist" });
    }
    return res.status(200).json({ message: existvenue });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ messsage: "Internal server error" });
  }
};

module.exports.getAllDetail = async (req, res) => {
  try {
    const existvenue = await venueModel.find();
    if (!existvenue) {
      return res.status(400).json({ message: "Venue doesnot exist" });
    }
    return res.status(200).json({ message: existvenue });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ messsage: "Internal server error" });
  }
};

module.exports.deleteVenue = async (req, res) => {
  try {
    const id = req.user.id;
    const { venueId } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    if (user.role === "student") {
      return res.status(400).json({ message: "U cant delete" });
    }
    const existvenue = await venueModel.findByIdAndDelete(venueId);
    if (!existvenue) {
      return res.status(400).json({ message: "Venue doeanot exist" });
    }
    return res.status(200).json({ message: "venue Deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ messsage: "Internal server error" });
  }
};
