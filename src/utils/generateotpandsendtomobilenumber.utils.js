const sendSMStoMobileNumber=async(otp,numbers)=>{
  console.log("numbers ",numbers);
    const data = {
        apikey: "NDg1YTU5Njc3MTRhMzI2ODUxMzc3YTZhNjM1MjM3NzM=",
        numbers: numbers.join(','),
        message: `Your otp is ${otp}.`,
        sender: 'TXTLCL' // Replace with your sender ID
      };

      const response =await fetch("https://api.textlocal.in/send/",{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
      });
      console.log("response ",response);
      if(response.ok){
        return true;
      }else{
        return false;
      }
}

module.exports=sendSMStoMobileNumber;