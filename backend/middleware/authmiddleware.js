//here we verify the jwt token and use it as a middleware in the routes
 

const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const authmiddleware = async (req,res,next)=>{

    try{

        const token = req.cookies.token;


        if(!token){
            return res.status(403).json({
                message:"Please login "
            })
        }

        const decodedData = jwt.verify(token,process.env.SECRET_KEY);

        if(!decodedData){
            return res.status(401).json({
                message:"token expired "
            })
        }

         req.user = await User.findById(decodedData._id);
         next();
    }

   

    catch(err){
        return res.status(500).json({
            message:"Please Login"
        })

    }

}

module.exports={
    authmiddleware
}