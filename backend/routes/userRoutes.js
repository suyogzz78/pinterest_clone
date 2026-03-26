const {registerUser} = require('../controller/userController');
const express = require('express');
 const router = express.Router();


 router.get('/register', registerUser);




module.exports = router;