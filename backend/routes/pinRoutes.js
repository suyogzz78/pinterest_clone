const express = require("express");
const { authmiddleware } = require("../middleware/authmiddleware");

const { uploadfile } = require("../middleware/multer");
const { createpin ,getallpins,getpinbypinid} = require("../controller/pinController");

const router = express.Router();

router.post("/createpin",authmiddleware,uploadfile, createpin);
router.get("/getpins",authmiddleware, getallpins);
router.get("/getpin/:id",authmiddleware, getpinbypinid);




module.exports = router;