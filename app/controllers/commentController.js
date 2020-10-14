const db = require('../models/mainModels');
const { Schema, mongo, isValidObjectId, Mongoose } = require('mongoose');

exports.getAllCommentById = async (req,res,next)=>{
    db.commentModels.findById({_id:mongo.ObjectID(req.body.id)},(er,ok)=>{
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

exports.postComment = async (req,res,next)=>{
    var comment = req.body;
    db.commentModels.insertMany(comment,(er,ok)=>{
        if(er){
            return res.status(500).json({
                "Message":"Can't post comment to Blog",
                "Error":er
            })
        }
        if(ok){
            return res.status(200).json({
                "Message":"Post comment to Blog Successfully",
                "Comment":ok
            })
        }
    })
}
