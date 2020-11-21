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
