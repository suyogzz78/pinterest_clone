// const express = require("express");
// const connectDB = require("./database/db");
// const dotenv = require("dotenv");
// const userRoutes = require("./routes/userRoutes");
// const pinRoutes = require("./routes/pinRoutes");
// const cookieParser = require("cookie-parser");
// const cloudinary = require("cloudinary").v2;
// const cors = require("cors");

// dotenv.config();
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const app = express();

// const port = process.env.PORT||5000;

// app.use(cors({
//   origin: "http://localhost:5173", // Your React app's URL
//   credentials: true, // Allow cookies to be sent
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
// }));



// //middleware
// app.use(express.json());

// app.use(cookieParser());

// app.use("/api/users", userRoutes);
// app.use("/api/pins", pinRoutes);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
//   connectDB();
// });
require("dns").setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const connectDB = require("./database/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const pinRoutes = require("./routes/pinRoutes");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.use("/api/users", userRoutes);
app.use("/api/pins", pinRoutes);

// start server AFTER DB connection
const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.log("Server failed:", err.message);
  }
};

startServer();