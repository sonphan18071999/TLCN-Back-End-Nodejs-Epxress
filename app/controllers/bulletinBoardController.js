const db = require('../models/mainModels')
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name:"dsnt8hyn6",
  api_key:"121517243286974",
  api_secret:"q-rZlX2PIYFPuLOmPlrZso1UYx4"
})
exports.createNewBullentinBoard = async (req,res,next)=>{
    //1. Lấy nội dung từ bullentinBoard.
    var bullentinBoard = new db.bullentinBoard();
    bullentinBoard = req.body.bullentinBoard;
    // 2. Convert link image main Image send to cloudiary make it online
    if (bullentinBoard.imgUrl != null) {
        var uploadImageSuccess = await cloudinary.uploader.upload(bullentinBoard.imgUrl)
        if(uploadImageSuccess){
            bullentinBoard.imgUrl=uploadImageSuccess.url.toString()
            var bltBoard = await db.bullentinBoard.create(bullentinBoard);
            if (bltBoard) {
                return res.status(200).json({
                    "Message": "Create Bullentin Board successfully",
                    "BullentinBoard": bltBoard
                })
            }
        }
    }
   
}
exports.viewDetail = async (req,res,next)=>{
    //1. Trả về thông tin bài viết.
    var detailBullentin = await db.bullentinBoard.findOne({_id:req.body.id});
    var likesCount = await db.bullentinBoard.count(likesUser);
    var viewCount = await db.bullentinBoard.count(viewer);
    if(detailBullentin){
        detailBullentin.likesUser = likesCount;
        viewCount.viewer = viewCount;
        return res.status(200).json({
            "Message":"Get detail Bullentin Board",
            "BullentinBoard":detailBullentin
        })
    }
    //2. Trả về số lượt xem, thông qua việc đếm người xem trong hệ thống.

}
exports.getAllBullentinBoardByDate = async (req,res,next)=>{
    var bullentinBoard = await db.bullentinBoard.find();
    var currentDay = new Date();
    var dailyBullentinBoard = new db.bullentinBoard();
    for(var item of bullentinBoard){
        if(item.datePost.getDate()==currentDay.getDate()){
            dailyBullentinBoard.push(item)
        }
    }
    if(dailyBullentinBoard!=null){
        return res.status(200).json({
            "Message":"All Bullentin Board",
            "AllBullentinBoard":dailyBullentinBoard
        })
    }else{
        return res.status(203).json({
            "Message":"We have any bullentin now"
        })
    }
}