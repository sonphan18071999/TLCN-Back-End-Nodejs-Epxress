const db = require('../models/mainModels')
exports.createNewBullentinBoard = async (req,res,next)=>{
    //1. Lấy nội dung từ bullentinBoard.
    var bullentinBoard = req.body.bullentinBoard;
    // 2. Convert link image main Image send to cloudiary make it online
    if (bullentinBoard.imgUrl != null) {
        await cloudinary.uploader.upload(bullentinBoard.imgUrl, function (ok, err) {
            //set URL for bullentinBoard
            bullentinBoard.imgUrl = ok.url;
        })
    }
    // 3. Insert bullentinboard to database type JSON - Raw
    var bltBoard = await db.BullentinBoardSchema.create(article);
    if (bltBoard) {
    return res.status(200).json({
        "Message":"Create Bullentin Board successfully",
        "BullentinBoard":bltBoard
        })
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