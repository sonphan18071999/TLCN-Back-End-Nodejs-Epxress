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
    ).then(res=>{
        
    });
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
exports.banArticle = async (req,res,next)=>{
    //1. Admin sẽ chọn level ban cho bài viết.
    // await db.articleBeingReportModels.findOne({idArticle:req.body.idArticle})
}
exports.disableArticle = async (req,res,next)=>{
    await db.articleBeingReportModels.findOneAndUpdate({idArticle:req.body.idArticle},{$set:{isDisabled:true}})
    .then(ok=>{
        return res.status(200).json({
            "Message":"Disable article succesfully",
            "Aricle":ok
        })
    });
 
}
exports.enableArticle = async (req,res,next)=>{
    await db.articleBeingReportModels.findOneAndUpdate({idArticle:req.body.idArticle},{$set:{isDisabled:false}})
    .then(ok=>{
        return res.status(200).json({
            "Message":"Enable article succesfully",
            "Aricle":ok
        })
    });
 
}
exports.getAllArticleBeingReport = async(req,res,next)=>{
    var allArticleBeingReport = await db.articleBeingReportModels.find();
    // allArticleBeingReport= Array.from(allArticleBeingReport)
    var arrayTitle = new Array();
    for(var item of allArticleBeingReport){
        await db.articleModels.findOne({ _id: item.idArticle }).then(ok=>{
            arrayTitle.push({"title":ok.tittle})
        });
    }    
    var arrDem =[];
    var allArticleBeingReportReturn =[];
    for(var i =0;i<allArticleBeingReport.length;i++){
        arrDem ={
            Article: allArticleBeingReport[i],
            Title: arrayTitle[i]
        }
        allArticleBeingReportReturn.push(arrDem);
    }
    return res.status(200).json({
        "Message":"All article being report",
        "Article":allArticleBeingReportReturn
    })
    // for (var i = 0; i < allArticleBeingReport.length; i++) {
    //     var a = await db.articleModels.findOne({ _id: allArticleBeingReport[i].idArticle });
    //     if (a) {
    //         allArticleBeingReport[i].push({ "title": a.tittle });
    //         console.log(allArticleBeingReport[i])
    //         // if (i == allArticleBeingReport.length - 1) {
    //         //     return res.status(200).json({
    //         //         "Message": "Get all article being report",
    //         //         "Article": allArticleBeingReport
    //         //     })
    //         // }
    //     }
    // }
   
}