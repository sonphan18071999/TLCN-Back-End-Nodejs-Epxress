const db = require('../models/mainModels');
const { Schema, mongo, isValidObjectId, Mongoose } = require('mongoose');

exports.getAllCommentByIdArticle = async (req,res,next)=>{
   await db.commentModels.find({idArticle:mongo.ObjectID(req.body.idArticle)},(er,ok)=>{
        if(er){
            return res.status(500).json({
                "Message":"Comment doesnt exist"
            })
        }
        if(ok){
            return res.status(200).json({
                "Message":"Get all comment successfully",
                "Comment":ok
            })
        }
    })
}

/**Tạo mới một comment trong bài viết. */
exports.postCommentParent = async (req,res,next)=>{
    var comment = req.body;
    await db.commentModels.create(comment,(er,ok)=>{
        if (er) {
            return res.status(500).json({
                "Message": "Can't post comment parent to Blog",
                "Error": er
            })
        }
        if (ok) {
            return res.status(200).json({
                "Message": "Post comment parent to Blog Successfully",
                "Comment": ok
            })
        }
    })
}
/** POst comment con. Nhũng comment phía dưới một comment lớn. */
exports.postCommentChild = async(req,res,next)=>{
    var comment = req.body.childComment;
    //Day comment con vao mang da co san cua comment cha.
    if(comment.contentChild==""){

    }else{
        await db.commentModels.findOne({_id:req.body.idParent},(er,ok)=>{ 
            if (er) {
                return res.status(500).json({
                    "Message": "Can't post comment child to Blog",
                    "Error": er
                })
            }
            if (ok) {
                ok.childComment.push(comment);
                ok.save().then((result) => {
                return res.status(200).json({
                    "Message": "Post comment successfully",
                    "Success": result
                })
                }).catch((err) => {
                    return res.status(200).json({
                        "Message": "Post comment successfully",
                        "Success": err
                    })
                });
               
            }
        })
    }
    
}