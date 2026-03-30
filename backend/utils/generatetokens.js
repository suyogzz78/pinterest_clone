const jwt = require('jsonwebtoken');


const generatettokens=(_id,res)=>{
const tokens = jwt.sign({_id},process.env.SECRET_KEY,{
        expiresIn:"15d"
})

res.cookie("token",tokens,{ 
    maxAge:15*24*60*60*1000,
    sameSite:"strict"
})


};

module.exports={generatettokens}