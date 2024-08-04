const generateOTP=()=>{

    // generate 4 digits otp between 1000 and 9000
    const otp = Math.floor(1000 + Math.random() * 9000);

    // otp expire within 1 minutes
    const otpExpier = new Date();
    otpExpier.setMinutes(otpExpier.getMinutes() + 1);

    //return otp and otpexpire time
    return {otp,otpExpier};
}

module.exports=generateOTP;