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
      email
    });

    return res.status(201).json(
        {
            user,
            message:"Account registered"
        }
    )
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  registerUser,
};
