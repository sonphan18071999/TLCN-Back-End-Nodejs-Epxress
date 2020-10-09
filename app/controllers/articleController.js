const { json } = require('body-parser');
const db = require('../models/mainModels');
const upload = require("../middleware/upload");
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name:"dsnt8hyn6",
  api_key:"121517243286974",
  api_secret:"q-rZlX2PIYFPuLOmPlrZso1UYx4"
})

exports.addNewArticle = async function (req, res, next) {
    //1.  save data image first.
    // req.body.arrImageInPost.forEach( async element => {
    //   try {
    //     await upload(element, res);
    //     console.log(element);
    //     if (element == undefined) {
    //       return res.status(500).json({
    //         message: "You must selected a file",
    //       });
    //     }
    //     else res.status(200).json({message:"Post image success"})
    //   } catch (error) {
    //     console.log(error);
    //     return res.send(`Error when trying upload image: ${error}`);
    //   }
    //   console.log(element)
    // });


    const file = req.files.photo
    // console.log(file);
    file.forEach(element => {
      // console.log(element.tempFilePath);
      cloudinary.uploader.upload(element.tempFilePath, function (err, result) {
        if (err) {
          console.log("Error: ", err);
        } else {
          console.log("Result: ", result);
        }
      })
    });

    //2.Then save data later. Because Image will be save in another file and they return id image for article to save.  
  const a = new db.articleModels({
    tittle: req.body.tittle,
    content: req.body.content,
    idUser: req.body.idUser,
  })
  console.log(req.body.content)
  // console.log("Content nè ku: "+JSON.stringify( req.body.content))
  a.save(function (errr) {
    if (errr) {
      res.status(500).json("Failed to create new article");
    } else
      return res.status(200).json({
        message: "Create new article successfully!!",
        article: a
      })
  })
}

exports.getAllArticle = async function (req, res, next) {
  const allArticle = await db.articleModels.find();

  return  res.status(200).json({
      message: "All article in database",
      allArticle: allArticle
    });
  
}