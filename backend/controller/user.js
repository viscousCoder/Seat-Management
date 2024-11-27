const User = require("../models/user");

async function createUser(req, res) {
  //   console.log("inside");
  const { username, email, password, phoneNumber, age } = req.body;
  //   console.log(req);
  try {
    await User.create({ username, email, password, phoneNumber, age });
    return res.status(201).json({ message: "created successfully" });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
}

async function checkUser(req, res) {
  const { email, password } = req.body;
  try {
    const token = await User.matchPassword(email, password);
    const userData = await User.findOne({ email });
    console.log("login", userData._id);
    return res
      .cookie("token", token)
      .status(200)
      .json({ messgae: "Successfully login", token, userId: userData?._id });
  } catch (error) {
    return res.status(500).json({
      message: "Error finding user",
      error: error.message,
    });
  }
}

module.exports = { createUser, checkUser };
