const db = require("../models/mainModels");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "dsnt8hyn6",
  api_key: "121517243286974",
  api_secret: "q-rZlX2PIYFPuLOmPlrZso1UYx4",
});
exports.createNewBullentinBoard = async (req, res, next) => {
  //1. Lấy nội dung từ bullentinBoard.
  var bullentinBoard = new db.bullentinBoard();
  bullentinBoard = req.body.bullentinBoard;
  // 2. Check user
  var user = await db.userAccountModels.findOne({
    _id: bullentinBoard.idAuthor,
  });
  if (!user) {
    return res.status(203).json({
      Message: "Authenticate failed",
    });
  }
  // 3. Convert link image main Image send to cloudiary make it online
  if (bullentinBoard.imgUrl != null) {
    var uploadImageSuccess = await cloudinary.uploader.upload(
      bullentinBoard.imgUrl
    );
    if (uploadImageSuccess) {
      bullentinBoard.imgUrl = uploadImageSuccess.url.toString();
      var bltBoard = await db.bullentinBoard.create(bullentinBoard);
      if (bltBoard) {
        return res.status(200).json({
          Message: "Create Bullentin Board successfully",
          BullentinBoard: bltBoard,
        });
      }
    }
  }
};

exports.getAllBullentinBoard = async (req, res, next) => {
  var a = await db.bullentinBoard.find();
  var dailyBullentinBoard = new Array();
  for (var i = 0; i < a.length && a.length < 15; i++) {
    if (a[i] != null) {
      dailyBullentinBoard.push(a[i]);
    } else {
      break;
    }
  }
  if (dailyBullentinBoard) {
    return res.status(200).json({
      Message: "All Bullentin Board",
      AllBullentinBoard: dailyBullentinBoard,
    });
  } else {
    return res.status(203).json({
      Message: "We have any bullentin now",
    });
  }
};
exports.getDetailBullentinBoardById = async (req, res, next) => {
  //1. Trả về thông tin chi tiết 1 bài viết.
  var BullentinBoard = await db.bullentinBoard.findById({ _id: req.body.id });
  //2. Từ Id lấy được trả về thông tin người dùng.
  if (BullentinBoard) {
    var idAuthor = BullentinBoard.idAuthor;
    var infoAuthor = await db.userAccountModels.findById({ _id: idAuthor });
  }
  //3. Trả về những Comment trong bảng tin đó.
  if (BullentinBoard) {
    return res.status(200).json({
      Message: "Get bullentin board successfully",
      BullentinBoard: BullentinBoard,
      AuthorInformation: infoAuthor,
    });
  }
};
