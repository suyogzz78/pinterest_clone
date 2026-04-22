// middleware/authmiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const authmiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Please login"
            });
        }

        const decodedData = jwt.verify(token, process.env.SECRET_KEY);

        if (!decodedData) {
            return res.status(401).json({
                message: "Token expired or invalid"
            });
        }

        const user = await User.findById(decodedData._id).select("-password");
        
        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("Auth middleware error:", err);
        return res.status(401).json({
            message: "Authentication failed"
        });
    }
}

module.exports = { authmiddleware };