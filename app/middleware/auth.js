const jwt = require("jsonwebtoken");
const TOKEN = require("../helper/helper");
const db = require("../models/mainModels");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, TOKEN.SECRET);
    const userId = decodedToken.userId;
    const userOpt = await db.accountDTO.findOne({ _id: userId });
    if (userOpt.id !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
