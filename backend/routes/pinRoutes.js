const express = require("express");
const { authmiddleware } = require("../middleware/authmiddleware");

const { uploadfile } = require("../middleware/multer");
const { createpin } = require("../controller/pinController");

const router = express.Router();

router.post("/createpin",authmiddleware,uploadfile, createpin);



module.exports = router;