const { createRoleDetailsService, createUserDetailsDetailsService, loginUserDetailsService, getUserDetailsByuserIdService, updateUserDetailsService } = require("../services/user.service");
const jwt=require("jsonwebtoken");

const createRoleDetails=async (req,res)=>{
    const {roleName}=req.body;
    const createdRoleDetails=await createRoleDetailsService(roleName);
    (createdRoleDetails)? res.status(201).json({
        data:createdRoleDetails,
        statusCode:201,
        message:"Data created successfully"
    }):res.status(500).json({
        data:null,
        statusCode:500,
        message:"Internal server error"
    });
}

const createUserDetails=async (req,res)=>{
    const {name,email,password,roleId,permissions}=req.body;
    const createdUserDetails=await createUserDetailsDetailsService({name,email,password,roleId},permissions);
    (createdUserDetails)? res.status(201).json({
        data:createdUserDetails,
        statusCode:201,
        message:"Data created successfully"
    }):res.status(500).json({
        data:null,
        statusCode:500,
        message:"Internal server error"
    });

}

const loginUserDetails=async(req,res)=>{
    const {email,password}=req.body;
    const loginDetails=await loginUserDetailsService(email,password);
    if(loginDetails===null){
       return res.status(500).json({
        data:null,
        statusCode:500,
        message:"Data not found"
    })
    } else if(loginDetails===0){
        return res.status(500).json({
            data:null,
            statusCode:500,
            message:"Password missmatched"
        })
    }else{
        const user = {
            userId: loginDetails.id,
            email: loginDetails.email,
            roleId: loginDetails.roleId,
            roleName:loginDetails?.role.roleName,
            permissions:loginDetails.permissions
        }
        const authToken = jwt.sign(user,"1$#2X!h4LpQZ3vB5wY8DkGnMqTmW9zA1d", { expiresIn: "1hour" });
        return res.status(200).json({
            data:{authToken,loginDetails},
            statusCode:200,
            message:"logged in successfully"  
        })
    }
}

const getUserDetailsByuserId=async(req,res)=>{
    const permissions=req.user.permissions;
    console.log(permissions);
    const userId=req.params.userId;
    const getUserDetails=await getUserDetailsByuserIdService(userId);
    (getUserDetails)? res.status(200).json({
        data:getUserDetails,
        statusCode:200,
        message:"Data fetched successfully"  
    }): res.status(500).json({
        data:null,
        statusCode:500,
        message:"Data not found"
    });
}

const updateUserDetails=async(req,res)=>{
    const userId=req.params.userId;
    const {name,email,password,roleId,permissions}=req.body; 
    const updateDetails=await updateUserDetailsService(userId,{name,email,password,roleId},permissions);
    (updateDetails)? res.status(200).json({
        data:updateDetails,
        statusCode:200,
        message:"Data updated successfully"  
    }): res.status(500).json({
        data:null,
        statusCode:500,
        message:"Data not found"
    });
}

module.exports={createRoleDetails,createUserDetails,loginUserDetails,getUserDetailsByuserId,updateUserDetails};