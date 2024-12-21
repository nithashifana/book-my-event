const userModel = require("../models/userModel");
// const bcrypt = require("bcryptjs")

module.exports.regUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      console.log(name, email, password)
      return res.status(400).json({ message: "All fields are mandatory" });
    }
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({message: "Email already exists"});
    }

    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXHYZ1234567890";
    let code = "";
    for (let i = 0; i < 10; i++) {
      code += characters[Math.floor(Math.random() * 62)];
    }

    const newUser = new userModel({
      name,
      email,
      password,
      code,
    });
    await newUser.save();
    return res.status(201).json({message: "Registered succesfully"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "internal server error"})
  }
};

module.exports.loginUser = async (req, res) => {};

module.exports.getUserDetail = async (req, res) => {};

module.exports.getAllUserDetail = async (req, res) => {};

module.exports.deleteUser = async (req, res) => {};
