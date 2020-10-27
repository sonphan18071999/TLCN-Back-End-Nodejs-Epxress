const { json } = require('body-parser');
const db = require('../models/mainModels');
const upload = require("../middleware/upload");
const { Schema, mongo, isValidObjectId, Mongoose } = require('mongoose');
const {ObjectId} = require('mongodb'); // or ObjectID 

const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name:"dsnt8hyn6",
  api_key:"121517243286974",
  api_secret:"q-rZlX2PIYFPuLOmPlrZso1UYx4"
})

exports.addNewArticle = async function (req, res, next) {
   
  
  var article = new db.articleModels();
  article = req.body;
  // 1. Convert link image main Image send to cloudiary make it online
 
  await cloudinary.uploader.upload(article.AvatarPost, function (err, result) {
    // if (err) {
    //   console.log("Error: ", err);
    // } else {
      //set URL for Avatar Post
      article.AvatarPost=err.url;
      // console.log(err.url);
    // }
  })

   //2. Convert link images send to cloudiary and make it online
  for (var i = 0; i < article.content.length; i++) {
    await cloudinary.uploader.upload(article.content[i].images,
      function (err, result) {
      // if (err) {
      //   // console.log("Error: ", err);
      // } else {
      //   //Lấy URL trả về từ Cloudiary
      //   console.log("Url da upload la: " + article.content[i].images);
        article.content[i].images = err.url.toString();
      // }
    })
  } 

  //3. Insert article to database type JSON - Raw
  await db.articleModels.insertMany(article, function (err, ok) {
    if (err) {
      res.status(500).json(
        { "message": "Cant insert article" }
      )
    }
    if (ok) {
      return res.status(200).json({
        "Message":"Post article successfully",
        "article":ok
      })
    }
  })
}

exports.getAllArticle = async function (req, res, next) {
  const allArticle = await db.articleModels.find();
  return  res.status(200).json({
      message: "All article in database",
      "Article": allArticle
    }); 
}
exports.getArticleById = async function (req, res, next) {
  await db.articleModels.findOne({ _id: req.query.id },(err,ok)=>{
  return ok ? res.status(200).json({"Aricle":ok}) : 
              res.status(500).json({"Cant retrive article ":err})
  })
}

exports.updateArticleById = async function (req,res,next) {
  var article = req.body;
  await db.articleModels.findOneAndUpdate({_id:req.body.id},{$set:{tittle:article.tittle}}, (error,ok)=> {
    if(error){
    return res.status(500).json({
        "Message":"Cant update this article",
        "Error":error
      })
    }
    if(ok){
    return  res.status(200).json({
        "Message":"Insert article successfully",
        "Article":ok
      })
    }
  }) 
} 
exports.deleteArticleById = async (req,res,next)=> {
  if(req.body.id==null){
    return res.status(500).json({
      "Message":"You don't put any id"
    })
  }
  await db.articleModels.deleteOne({_id:mongo.ObjectID(req.body.id)},(err,ok)=>{
    if(err){
      return res.status(500).json({
        "Message":"Cant delete this article",
        "error":err
      })
    }
    if(ok){
      return res.status(200).json({
        "Message":"Delete article successfully"
      })
    }
  })
}