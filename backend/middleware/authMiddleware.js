const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(400).json({ message: "Not authorization, no token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }
    next();
  } catch (err) {
    res.status(404).json({ message: "Not authorized, token failed" });
  }
};
