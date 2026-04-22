const jwt = require('jsonwebtoken');

const generatettokens = (_id, res) => {
    const tokens = jwt.sign({_id}, process.env.SECRET_KEY, {
        expiresIn: "15d"
    });

    res.cookie("token", tokens, { 
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,     // Add this for security
        sameSite: "lax",    // Change from "strict" to "lax"
        secure: false,      // Set to false for localhost (HTTP)
        path: '/'           // Explicitly set path
    });
};

module.exports = { generatettokens };