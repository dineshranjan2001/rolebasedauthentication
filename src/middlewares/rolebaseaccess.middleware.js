
const jwt=require("jsonwebtoken");

const roleBasedAccess=(roleName)=>{
    return (req,res,next)=>{
    try {
        const token=req.header("Authorization")?.replace("Bearer ","");
        if(!token){
            return res.status(401).json({statusCode:401,message:"Unauthorized request"});
        }
        const user=jwt.verify(token,"1$#2X!h4LpQZ3vB5wY8DkGnMqTmW9zA1d");
        const roleArray=Object.entries(user).filter(value => value === "roleName");
        if(!user){
            return res.status(401).json({statusCode:401,message:"Invalid access token"});
        }
        req.user=user;
        if(roleArray.includes(roleName)){
            next();
        }else{
            return res.status(403).json({ statusCode:403,message: `Access Denied` });  
        }
       
    } catch (error) {
        return res.status(401).json({statusCode:401,message:error?.message||"Invalid access token"});
    }
};
}

module.exports={roleBasedAccess};