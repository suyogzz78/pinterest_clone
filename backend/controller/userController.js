const { generatettokens } = require("../utils/generatetokens");
const User = require("./../model/userModel");

const bcrypt = require("bcrypt");

async function registerUser(req, res) {
  try {
    const { email, name, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "Account already exists",
      });
    }
    const hashpassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      password: hashpassword,
      email,
    });

    return res.status(201).json({
      user,
      message: "Account registered",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Sorry the user is not registered",
      });
    }

    const comparepass = await bcrypt.compare(password, user.password);

    if (!comparepass) {
      return res.status(400).json({
        message: "The password is incorrect",
      });
    }
    generatettokens(user._id, res);
    res.status(201).json({
      message: "You are logged in successfully",
    });
  } catch (error) {
    console.error("Error logging user:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function myProfile(req, res) {
  try {
    const user = await User.findById(req.user._id);

    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: "error",
    });
  }
}

async function userProfile(req, res) {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {

    res.status(500).json({
      message:"error"
    })
  }
}

module.exports = {
  registerUser,
  loginUser,
  myProfile,
  userProfile
};
