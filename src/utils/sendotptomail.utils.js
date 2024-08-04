const nodemailer=require("nodemailer");
const sendOtpToMail=async(otp,email)=>{

    //when the env is production 
    // let transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       type: 'OAuth2',
    //       user: process.env.MAIL_USERNAME,
    //       pass: process.env.MAIL_PASSWORD,
    //       clientId: process.env.OAUTH_CLIENTID,
    //       clientSecret: process.env.OAUTH_CLIENT_SECRET,
    //       refreshToken: process.env.OAUTH_REFRESH_TOKEN
    //     }
    //   });

    // configure the mail creadential
    let transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'dineshranjanbiswal2001@gmail.com',
            pass:'alsafzhkboriskya'
        }
    });

    // configure the send details 
    const mailOptions = {
        from: 'dineshranjanbiswal2001@gmail.com',
        to: email,
        subject: 'Password reset OTP',
        text: `Your OTP (It is expired after 1 min) : ${otp}`,
    };

    //send mail
    const sentInfo=await transporter.sendMail(mailOptions);
    if(sentInfo){
        return true;
    }else{
        return false;
    }
    // transporter.sendMail(mailOptions,(error,info)=>{
    //     if(error){
        
    //         return false;
    //     }else{
    //         return true;
    //     }
    // })
}

module.exports=sendOtpToMail;