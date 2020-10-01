const db = require('../models/mainModels');
const fs = require('fs');
const upload = require("./middleware/upload");

exports.addNewImage = async function (req, res, next) {
    // const a = new db.imageModels({
    //   nameImag:req.body.nameImage
    // });
    // a.img.data = fs.readFileSync(req.body.data);
    // a.img.contentType = 'image/png';
    // a.save(function (errr) {
    //   if (errr) {
    //     res.status(500).json("Failed to post image" +errr);
    //     console.log("Data image la "+req.body.data)
    //   }
    //   else
    //     res.status(200).json({
    //       message: "Success to create new image",
    //       img: a
    //     });
    // })
    try {
      await upload(req, res);
  
      console.log(req.file);
      if (req.file == undefined) {
        return res.status(500).json({
          message: "You must selected a file",
        });
      }
  
      return res.status(200).json({
              message: "Image upload successfull",
            });
    } catch (error) {
      console.log(error);
      return res.send(`Error when trying upload image: ${error}`);
    }
}
