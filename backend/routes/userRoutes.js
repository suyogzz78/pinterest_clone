const { registerUser, loginUser, myProfile,userProfile, followerandfollowing,logoutUser } = require("../controller/userController");
const express = require("express");
const {authmiddleware} = require('./../middleware/authmiddleware')
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout",authmiddleware,logoutUser);
router.get("/me",authmiddleware,myProfile);
router.get("/:id",authmiddleware,userProfile);
router.post("/follow/:id",authmiddleware,followerandfollowing)

module.exports = router;
