const { json } = require('body-parser');
const db = require('../models/mainModels');
const upload = require("../middleware/upload");
const { Schema, mongo, isValidObjectId, Mongoose } = require('mongoose');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name:"dsnt8hyn6",
  api_key:"121517243286974",
  api_secret:"q-rZlX2PIYFPuLOmPlrZso1UYx4"
})

exports.addNewArticle = async function (req, res, next) {
   
  var idArticle,avatarResult;

  // 1. Convert link image main Image send to cloudiary make it online
  const fileMainImage = req.body.AvatarPost
  // console.log(file);
  // console.log(element  .tempFilePath);
  await cloudinary.uploader.upload(fileMainImage, function (err, result) {
    if (err) {
      console.log("Error: ", err);
    } else {
      avatarResult=result.url;

    }
  })

  //2. Insert article to database type JSON - Raw
  await db.articleModels.insertMany(req.body, function (err, article) {
    if (err) {
      res.status(500).json(
        { "message": "Cant insert article" }
      )
    }
    if (article) {
      idArticle = article[0]._id;
      
      
      //2. Update field Avatar main to make it become online URL
       db.articleModels.findByIdAndUpdate({ _id: mongo.ObjectId(idArticle) },
        {
          $set: { AvatarPost: avatarResult }
        }, function(er, ok) {
          if (er) {
            console.log("Kuasdasidasiodsaoidas")
            return res.status(500).json(
              { "message": "Cant post article." }
            )
          } else {

            return res.status(200).json({
              "message": "Post article successfull."
            })
          }
        })
    }
  })
  
    
 

  // db.articleModels.insertMany(a,function(err,files){
  //   console.log(req.body.content)
  //   if(err){
  //   res.status(500).send(err);
  //   }else{
  //     res.status(200).send(files);
  //   }
  // })
  
  // var a = new db.articleModels();
  // a.tittle="hello world";
  // req.body.content.forEach(element => {
  //   a.content.push(element)  
  //   console.log(element.partName)
  // });
  
  // // console.log(req.body.content)
  // console.log(a);



 
    // // //2. Convert link array many avatar.
    // const fileArrayImage = req.files.ArrayAvatarInPost
    // // console.log(file);
    // fileArrayImage.forEach(element => {
    //   // console.log(element.tempFilePath);
    //   cloudinary.uploader.upload(element.tempFilePath, function (err, result) {
    //     if (err) {
    //       console.log("Error: ", err);
    //     } else {
    //       console.log("Result: ", result);
    //       a.ArrayAvatarInPost.part=req.body.partName
    //       a.ArrayAvatarInPost.images.push(result.url);
    //     }
    //   })
    // });

  // // console.log(req.body.content)
  // // console.log("Content nè ku: "+JSON.stringify( req.body.content))
  // a.save(function (errr) {
  //   if (errr) {
  //     res.status(500).json("Failed to create new article"+errr);
  //   } else
  //     return res.status(200).json({
  //       message: "Create new article successfully!!",
  //       article: a
  //     })
  // })
}

exports.getAllArticle = async function (req, res, next) {
  const allArticle = await db.articleModels.find();

  return  res.status(200).json({
      message: "All article in database",
      allArticle: allArticle
    });
  
}