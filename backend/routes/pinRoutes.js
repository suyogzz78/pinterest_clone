// // routes/pinRoutes.js
const express = require("express");
const { authmiddleware } = require("../middleware/authmiddleware");
const { uploadfile } = require("../middleware/multer");
const {
  createpin,
  getallpins,
  getpinbypinid,
  commentonpins,
  deletecomment,
  deletepin,
  updatePin,
} = require("../controller/pinController");

const router = express.Router();

// Public routes (no authentication needed)
router.get("/getpins", getallpins); // Remove authmiddleware
router.get("/getpin/:id", getpinbypinid); // Remove authmiddleware

// Protected routes (authentication required)
router.post("/createpin", authmiddleware, uploadfile, createpin);
router.post("/comment/:id", authmiddleware, commentonpins);
router.delete("/comment/:id", authmiddleware, deletecomment);
router.delete("/deletepin/:id", authmiddleware, deletepin);
router.put("/updatepin/:id", authmiddleware, updatePin);

module.exports = router;
