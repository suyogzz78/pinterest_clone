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
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: "error",
    });
  }
}

async function followerandfollowing(req, res) {
  try {
    const user = await User.findById(req.params.id);
    const loggedinuser = await User.findById(req.user._id);

    if (!user) {
      return res.status(400).json({
        message: "No user with this id",
      });
    }
    if (user._id.toString() === loggedinuser._id.toString()) {
      return res.status(400).json({
        message: "You cannot follow yourself",
      });
    }

    if (user.followers.includes(loggedinuser._id)) {
      const indexfollowing = loggedinuser.following.indexOf(user._id);
      const indexfollower = user.followers.indexOf(loggedinuser._id);

      loggedinuser.following.splice(indexfollowing, 1);
      user.followers.splice(indexfollower, 1);

      await loggedinuser.save();
      await user.save();

      res.json({
        message: "User unfollowed",
      });
    } else {
      loggedinuser.following.push(user._id);
      user.followers.push(loggedinuser._id);

      await loggedinuser.save();
      await user.save();

      return res.json({ message: "User followed" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "server error",
    });
  }
}

async function logoutUser(req,res){
res.cookie("token","",{maxAge:0});

res.json({
  message:"User logged out",
})


}

module.exports = {
  registerUser,
  loginUser,
  myProfile,
  userProfile,
  followerandfollowing,
  logoutUser
};
