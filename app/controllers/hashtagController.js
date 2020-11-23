const db = require('../models/mainModels')
exports.createHashTag = async (req,res,next)=>{
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

exports.findHashTag = async (req,res,next)=>{

}
exports.getAllHashTagByArticleId = async(req,res,next)=>{
    var idArticle = req;
    var allHashTag = await db.hashTagModels.find({article:idArticle})
    return allHashTag;
}
