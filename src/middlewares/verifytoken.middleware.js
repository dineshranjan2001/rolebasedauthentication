
const jwt=require("jsonwebtoken");

const verifyToken=async(req,res,next)=>{
    try {
        const token=req.header("Authorization")?.replace("Bearer ","");
        if(!token){
            return res.status(401).json({statusCode:401,message:"Unauthorized request"});
        }
        const user=jwt.verify(token,"1$#2X!h4LpQZ3vB5wY8DkGnMqTmW9zA1d");
        if(!user){
            return res.status(401).json({statusCode:401,message:"Invalid access token"});
        }
        req.user=user;
        next();
    } catch (error) {
        return res.status(401).json({statusCode:401,message:error?.message||"Invalid access token"});
    }
};

module.exports={verifyToken};