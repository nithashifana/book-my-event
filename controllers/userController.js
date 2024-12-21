const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const JWT_TOKEN = process.env.JWT_TOKEN;


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

module.exports.loginUser = async (req, res) => {
  try {
    const {email, password} = req.body;
    if(!email || !password) {
      return res.status(400).json({message: "Both email and password are required"})
    }
    const existingEmail = await userModel.findOne({email});
    if(!existingEmail) {
      return res.status(400).json({message: "Email doesnot exist"})
    }
    const isPasswordValid = await bcrypt.compare(password, existingEmail.password)
    if(!isPasswordValid){
      return res.status(400).json({message: "Password invalid"})
    }
    
    const token = jwt.sign({id: existingEmail._id}, JWT_TOKEN, {expiresIn: "1hr"})
    return res.status(200).json({message: "Login successfull", token})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal server error"})
  }

};

module.exports.getUserDetail = async (req, res) => {
  try {
    const id = req.user.id
    if(!id) {
      return res.status(400).json({message: "id required"})
    }
    const user = await userModel.findById(id)
    if(!user) {
      return res.status(400).json({message: "user not found"})
    }
    return res.status(400).json({message: user})
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal server error"})
  }
};

module.exports.getAllUserDetail = async (req, res) => {
  try {
    const id = req.user.id
    if(!id) {
      return res.status(400).json({message: "id required"})
    }
    const user = await userModel.findById(id)
    const users = await userModel.find()
    if(!user) {
      return res.status(400).json({message: "user not found"})
    }
    if(user.role === "organizer" || user.role === "admin") {
      return res.status(200).json({message: users})
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal server error"})
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const id = req.user.id
    if(!id) {
      return res.status(400).json({message: "Id required"})
    }
    const user = await userModel.findByIdAndDelete(id)
    if(!user) {
      return res.status(400).json({message: "user not found"})
    }
    return res.status(400).json({message: "Deleted succesfully"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Inernal server error"})    
  }
};
