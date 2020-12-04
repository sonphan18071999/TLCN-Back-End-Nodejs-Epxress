const db = require('../models/mainModels')
exports.createHashTag = async (req,res,next)=>{
    req.hashTag.splice(0,1);
    for (const e of req.hashTag){
        const a = await db.hashTagModels.findOne({name:e.name.toString().trim()});
        if(a){
            //Đã tồn tại hastag đó. Push id vào array.
            a.article.push(req.idArticle);
            a.save();
        }else{
            //Chưa tồn tại hashTag đó
            const b = await db.hashTagModels.create({
                name:e.name.toString().trim(),
                article:req.idArticle
            })
        }
    }
}

exports.findArticleByHashTagName = async (req,res,next)=>{
    var arrArticle=await db.hashTagModels.findOne({name:req.body.hashTagName.trim()});
    arrArticle = arrArticle.article;
}
exports.getAllHashTagByArticleId = async(req,res,next)=>{
    var idArticle = req;
    var allHashTag = await db.hashTagModels.find({article:idArticle})
    return allHashTag;
}
