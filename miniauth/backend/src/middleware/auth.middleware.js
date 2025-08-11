const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");

const authMiddleware = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(400).json({
      message: "Please login first",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const user = await userModel.findOne({
      _id: decoded.id,
    });
    res.user = user;
  } catch (error) {
    return res.status(400).json({
      message: "unauthorized user",
    });
  }

  next();
};

module.exports = authMiddleware;
