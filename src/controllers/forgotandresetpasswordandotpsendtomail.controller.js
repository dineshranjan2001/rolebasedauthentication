const { forgotPasswordService, resetPasswordService } = require("../services/forgotandresetpasswordandotpsendtomail.service");

const forgotPassword=async(req,res)=>{
    const {email}=req.body;
    const sendOtpResponseData=await forgotPasswordService(email);
    if(sendOtpResponseData===true){
        return res.status(200).json({
            data:null,
            statusCode:200,
            message:"Otp sent successfully"  
        })
    }else if(sendOtpResponseData===false){
        return res.status(500).json({
            data:null,
            statusCode:500,
            message:"Can't send otp"  
        })
    }else{
        return res.status(500).json({
            data:null,
            statusCode:500,
            message:"Data not found"
        });
    }
    
}

const resetPassword=async(req,res)=>{
    const {newPassword,confirmPassword,otp}=req.body;
    const resetPasswordStatus=await resetPasswordService(newPassword,confirmPassword,otp);
    if(resetPasswordStatus===0){
        return res.status(400).json({
            data:null,
            statusCode:400,
            message:"Password miss matched"  
        });
    }else if(resetPasswordStatus===1){
        return res.status(400).json({
            data:null,
            statusCode:400,
            message:"Invalid or expired OTP"  
        });
    }else if(resetPasswordStatus===null){
        return res.status(500).json({
            data:null,
            statusCode:500,
            message:"User not found"  
        });
    }else{
        return res.status(200).json({
            data:null,
            statusCode:200,
            message:"Password reset successful"  
        });
    }
}

module.exports={forgotPassword,resetPassword};