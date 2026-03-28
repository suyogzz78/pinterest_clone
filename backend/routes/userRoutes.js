const { registerUser, loginUser, myProfile } = require("../controller/userController");
const express = require("express");
const {authmiddleware} = require('./../middleware/authmiddleware')
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me",authmiddleware,myProfile);

module.exports = router;
