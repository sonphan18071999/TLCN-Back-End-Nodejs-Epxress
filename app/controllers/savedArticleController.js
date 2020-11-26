const db = require('../models/mainModels')

exports.SaveArticle = async(req,res,next)=>{
    var data = req.body;
    // console.log(data);
    if(data.idUser==null || data.allArticleSaved.idArticle==null){
        return res.status(500).json({
            "Message":"Some field is empty"
        })
    }else{
        var user = await db.savedModels.findOne({idUser:data.idUser});
    if(user){
        /**  Kiem tra bai viet do da duoc luu hay chua */
        var flag = 0;
        user.allArticleSaved.forEach(element => {
            if (element.idArticle == data.allArticleSaved.idArticle)
            {
                user.save();
                user.allArticleSaved.pop({ "idArticle": data.allArticleSaved.idArticle })
                flag = 1;
            }
        });
        if(flag==1){
            return res.status(500).json({
                "Message":"Unmark successfully",
                "User":user
            })
        }
        if (flag == 0) {
            user.save()
            user.allArticleSaved.push({ "idArticle": data.allArticleSaved.idArticle });
            return res.status(200).json({
                "Message": "Save article successfully",
                "user":user
        })
        }
    }else{
        let saveArticle = await db.savedModels.create(data);
        if(saveArticle){
            return res.status(200).json({
                "Message":"Save article successfully",
                "Saved_Article":saveArticle
            })
        }
    }
    }
}

exports.checkSaveArticle = async (req,res,next)=>{
    var data = req.body;
    // console.log(data);
    if(data.idUser==null || data.allArticleSaved.idArticle==null){
        return res.status(500).json({
            "Message":"Some field is empty"
        })
    }else{
        var user = await db.savedModels.findOne({idUser:data.idUser});
    if(user){
        /**  Kiem tra bai viet do da duoc luu hay chua */
        var flag = 0;
        user.allArticleSaved.forEach(element => {
            if (element.idArticle == data.allArticleSaved.idArticle)
            {
                flag = 1;
            }
        });
        if (flag == 1) {
            return res.status(500).json({
                "Message": "Article've already save"
            })
        } else {
            return res.status(200).json({
                "Message": "Article not saving yet"
            })
        }
        }
    }
}
exports.getSavedArticleByIdUser = async(req,res,next)=>{
    /**Sample */
    
    // "idUser":"5fac4788798f1a29785aca4a",
    // "count":"12"
    /**Sample */
    // 1. Lấy tất cả những id article đã lưu
    var allSavedIdArtile = await db.savedModels.findOne({idUser:req.body.idUser});
    // 2. Từ những IdArticle đó lấy tất cả những bài viết. 
    var arrSaveArticle = new Array();
    
    if(!allSavedIdArtile){      //Nếu không có article nào đã lưu thì return.
        return res.status(500).json({
            "Message":"User haven't save any article yet"
        })
    }
    var count=0;
    // Nếu tìm được những article đã lưu.
    for(var item of allSavedIdArtile.allArticleSaved){
            if((count>req.body.count)){ //Đã đạt số lượng bài viết yêu cầu
                // Trả về số article 
                return res.status(200).json({
                    "Message":"All saved article",
                    "SavedArticle":arrSaveArticle
                })
            }
            var a = await db.articleModels.findOne({_id:item.idArticle});
            arrSaveArticle.push(a);
            count++;
    }
    //Nếu số bài viết đã lưu ít hơn số lượng yêu cầu thì sẽ trả về số bài viết đang có đó.
    return res.status(200).json({
        "Message":"All saved article",
        "SavedArticle":arrSaveArticle
    })
}