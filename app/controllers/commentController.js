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

// Controller post comment parent.
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
// POst comment child. Comment ma thua ke tu comment lon.
exports.postCommentChild = async(req,res,next)=>{
    var comment = req.body.childComment;
    await db.commentModels.findOneAndUpdate({_id:req.body.idParent},{$push:{childComment:comment}},(er,ok)=>{
        if (er) {
            return res.status(500).json({
                "Message": "Can't post comment child to Blog",
                "Error": er
            })
        }
        if (ok) {
            return res.status(200).json({
                "Message": "Post comment child to Blog Successfully",
                "Comment": ok
            })
        }
    })
}