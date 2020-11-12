const db = require('../models/mainModels');
const { Schema, mongo, isValidObjectId, Mongoose } = require('mongoose');

exports.getAllCommentByIdArticle = async (req,res,next)=>{
    // var a = await db.commentModels.aggregate(
    //     [
    //         {
    //             $lookup: {
    //                 from: "useraccounts",
    //                 localField: "idUser",
    //                 foreignField: "_id",
    //                 as: "user_information"
    //             }
    //         },
    //         // {
    //         //     $group:{
    //         //         _id:{id:"$_id"},
    //         //         "content":{$content:"$content"},
    //         //         userInfo:{$addToSet:"$user_information"}
    //         //     }
    //         // }
    //         // ,
    //         // {
    //         //     $unwind:"$user_information"
    //         // }
    //         // ,{
    //         //     $lookup: {
    //         //         from: "user accounts",
    //         //         localField: "childComment.idUserChild",
    //         //         foreignField: "_id",
    //         //         as: "user_information_child"
    //         //     }
    //         // },
    //         // {
    //         //     $unwind:"$user_information_child"
    //         // }
    //     ]
    // )
    // if(a){
    //     return res.status(200).json({
    //         "message":"successfully get all comment",
    //         "Comment":a
    //     })
    // }

    // var a = await db.commentModels.aggregate(
    //     [
    //         {
    //             $lookup: {
    //                 from: "useraccounts.childComment",
    //                 localField: "idUserChild",
    //                 foreignField: "_id",
    //                 as: "user_information"
    //             }
    //         }
    //     ]
    // )
    // return res.status(200).json({
    //     "message":"get data successfully",
    //     "comment":a
    // })
    var a = await db.commentModels.find({idArticle:req.body.idArticle})
    if(a){
        return res.status(200).json({
            "Message":"Get all comment succesfully",
            "Comment":a
        })
    }
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