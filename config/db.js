const mongoose = require("mongoose");

module.exports.connectDB = async() => {
  try {
    await mongoose.connect(process.env.URI)
    console.log("connection successful");
  } catch(error) {
    console.log("Disconnected");
  }
};
