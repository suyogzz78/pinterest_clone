const express = require("express");
const connectDB = require("./database/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const pinRoutes = require("./routes/pinRoutes");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

const port = process.env.PORT || 3000;

//middleware
app.use(express.json());

app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/pins", pinRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
