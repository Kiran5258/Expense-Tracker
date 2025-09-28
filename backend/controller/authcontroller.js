const jwt=require('jsonwebtoken');
const User=require('../models/user');

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

exports.registeruser = async (req, res) => {
  const { fullname, email, password, profileimageurl } = req.body;

  if (!fullname || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = await User.create({
      fullname,
      email,
      password,
      profileimageurl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });

  } catch (err) {
    res.status(400).json({ message: "Error during registration", error: err.message });
  }
};
exports.loginuser=async(req,res)=>{
  const {email,password}=req.body;
  if(!email || !password){
    return res.status(400).json({message:"All fields are required"});
  }
  try{
    const user=await User.findOne({email});
    if(!user || !(await user.comparepassword(password))){
      return res.status(404).json({message:"Invalid email and password"})
    }
    res.status(200).json({
      id:user._id,
      user,
      token:generateToken(user._id)
    })
  }
  catch(err){
    res.status(400).json({ message: "Error during login", error: err.message });
  }
}

exports.getuserinfo=async(req,res)=>{
  try{
  const user=await User.findById(req.user.id).select("-password");
  if(!user){
    res.status(400).json({message:"User is not found"});
  }
  res.status(200).json(user);
  }catch(err){
    res.status(400).json({ message: "Error during getuser", error: err.message });
  }
}