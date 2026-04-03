const express = require("express");
const { authmiddleware } = require("../middleware/authmiddleware");

const { uploadfile } = require("../middleware/multer");
const {
  createpin,
  getallpins,
  getpinbypinid,
  commentonpins,
  deletepin,
} = require("../controller/pinController");

const router = express.Router();

router.post("/createpin", authmiddleware, uploadfile, createpin);
router.get("/getpins", authmiddleware, getallpins);
router.get("/getpin/:id", authmiddleware, getpinbypinid);
router.post("/comment/:id", authmiddleware, commentonpins);
router.delete("/comment/:id", authmiddleware, deletepin);


module.exports = router;
