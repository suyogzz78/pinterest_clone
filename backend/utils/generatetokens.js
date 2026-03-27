const jwt = require('jsonwebtoken');


const generatettokens=(_id,res)=>{
const tokens = jwt.sign({id},process.env.SECRET_KEY,{
        expiresIn:"15d"
})

res.cookie("tokens",tokens,{
    maxAge:15*24*60*60*1000,
    httpOnly:true,
    sameSite:"strict"
})


};