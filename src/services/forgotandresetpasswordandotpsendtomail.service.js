const UserDetails = require("../models/user.model");
const generateOTP = require("../utils/generateotpandexpiretime.utils");
const sendOtpToMail = require("../utils/sendotptomail.utils");
const { Op, Sequelize } = require('sequelize');


const forgotPasswordService=async(email)=>{
    const getUserDetails=await UserDetails.findOne({
        where:{
            email
        }
    });
    if(!getUserDetails){
        return null;
    }

    const {otp,otpExpier}=generateOTP();

    //update the otp and otp_expire field in the user_details table
    getUserDetails.otp=otp;
    getUserDetails.otpExpire=otpExpier;
    const updateStatus=await getUserDetails.save();

    /* check the condition if the otp and otp_expire field in the user_details table or not and if updated then send the 
    generated otp to the user's email for verification */
    if(updateStatus){
        const checkSendMailStatus=await sendOtpToMail(otp,getUserDetails.email);
        return !!(checkSendMailStatus);
    }else{
        return false;
    }

}

const resetPasswordService=async(newPassword,confirmPassword,otp)=>{
    if(newPassword.localeCompare(confirmPassword)!=0){
        return 0;
    }

    // find the otp compairing the current time (checking the time is less than to 1 min)
    const getOtp=await UserDetails.findOne({
        where:{
            otp,
            otpExpire:{
                [Op.gt]:Sequelize.fn('NOW')
            }
        },
        attributes:['otp']
    });

    // check the otp is present or not
    if(!getOtp){
        return 1;
    }

    // get the userdetails according to the otp
    const getUserDetails=await UserDetails.findOne({
        where:{
            otp:getOtp?.otp
        }
    });

    //check the userdetails present or not
    if(!getUserDetails){
        return null;
    }

    // set new password to password, otp to null, otpExpire to null and save the changes
    getUserDetails.password=newPassword;
    getUserDetails.otp=null;
    getUserDetails.otpExpire=null;

    const updateStatus=await getUserDetails.save();
    return updateStatus || null;
}

module.exports={forgotPasswordService,resetPasswordService};