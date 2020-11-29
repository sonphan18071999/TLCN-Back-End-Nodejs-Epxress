const db = require('../models/mainModels');
exports.createReports = async (req, res, next) => {
    // 1. Kiểm tra Article đó đã bị report trước đó chưa.
    var article = await db.articleBeingReportModels.findOne({ idArticle: req.body.idArticle });
    // 2. Nếu chưa thì tạo mới id Article bị report đó.
    if (!article) {
        var a = await db.articleBeingReportModels.create(req.body);
        return res.status(200).json({
            "Message": "Create report successfully",
            "Report": a
        })
    }
    else {
        // 3. Nếu đã tồn tại id Article rồi thì ta chỉ cần push userReport mới vào.
        // 3.1 Kiểm tra người dùng đó report bài này hay chưa
        for (var item of article.userReport) {
            if (item.idUser == req.body.userReport[0].idUser) {
                return res.status(200).json({
                    "Message": "Report Limited"
                })
            }
        }
    }
    // 4. Nếu người dùng chưa report bài này thì push idUser người này vào article.
    var b = await db.articleBeingReportModels.findOneAndUpdate(
        { idArticle: req.body.idArticle },
        { $push: { userReport: req.body.userReport[0] } }
    );
    if (b) {
        //Push thành công nhưng idUser của người post trả về trễ.(ko trả về kèm theo)
        return res.status(200).json({
            "Message": "Report successfully",
            "Report": b
        })
    }
}
exports.checkReportArticle = async(req,res,next)=>{
    
}