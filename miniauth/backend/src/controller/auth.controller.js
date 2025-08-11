const mongoose = require("mongoose");
const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const userAlreadyExist = await userModel.findOne({ username });
  if (userAlreadyExist) {
    return res.status(209).json({
      message: "user already exists",
    });
  }

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie('token', token, {
  httpOnly: true,
  secure: true,          // ✅ now true, because you're using HTTPS
  sameSite: 'none',      // ✅ if your frontend and backend are on different domains
  maxAge: 24 * 60 * 60 * 1000
});

  res.status(201).json({
    message: "user created successfully",
    user,
  });
};

const loginController = async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username });
  if (!user) {
    return res.status(404).json({
      message: "username not exist",
    });
  }

  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) {
    return res.status(400).json({
      message: "Credentials error",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  // res.cookie("token", token);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // ✅ now true, because you're using HTTPS
    sameSite: "none", // ✅ if your frontend and backend are on different domains
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "user logged in successffully",
    user,
  });
};

const logoutController = (req, res) => {
  res.clearCookie("token",{
     httpOnly: true,
  secure: true,         // Must match what you used when setting the cookie
  sameSite: 'none'      // Must also match your original settings
  });
  res.status(200).json({
    message: "logout success",
  });
};

const profileController = (req, res) => {
  const user = res.user;
  res.json({
    message: "user details",
    user,
  });
};

const deleteController = async (req, res) => {
  const user = res.user;
  const deletedUser = await userModel.findOneAndDelete({ _id: user._id });
  res.clearCookie("token");

  res.json({
    message: "User deleted successfully",
    deletedUser,
  });
};
const usersController = async (req, res) => {
  const users = await userModel.find();
  res.status(200).json({
    message: "user fetched successfully",
    users,
  });
};

module.exports = {
  registerController,
  loginController,
  profileController,
  logoutController,
  usersController,
  deleteController,
};
