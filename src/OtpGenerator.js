const generateOTP = () => {
  const characters = "0123456789";
  let OTP = "";

  for (let i = 0; i < 6; i++) {
    const index = Math.floor(Math.random() * characters.length);
    OTP += characters[index];
  }
  localStorage.setItem("otp", OTP);
  return OTP;
};

export default generateOTP;
