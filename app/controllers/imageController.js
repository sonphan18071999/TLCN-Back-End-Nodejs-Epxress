const db = require('../models/mainModels');
const fs = require('fs');
const uploadLocal = require("../middleware/upload");
const Grid = require('gridfs-stream');
const { mongo } = require('mongoose');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name:"dsnt8hyn6",
  api_key:"121517243286974",
  api_secret:"q-rZlX2PIYFPuLOmPlrZso1UYx4"
})
exports.addNewImage = async function (req, res, next) {

  const file = req.body.photo
  try {
    file.forEach(element => {
      // console.log(element.tempFilePath);
      cloudinary.uploader.upload(file, function (err, result) {
        if (err) {
          console.log("Error: ", err);
          return res.status(500).send({
            "message":"Send data not successfully",
            "err": err
          })
        } 
      })
    })
    return res.status(200).send({
      "message":"Post image successfully"
    })
  } catch (error) {
    cloudinary.uploader.upload(file,{type: "fetch"}, function (err, result) {
      if (err) {
        console.log("Error: ", err);
        return res.status(500).send({
          "message":"Send data not successfully",
          "err": err
        })
      } else {
        return res.status(200).send({
          "message":"Send data successfully",
          "image": result
        })
      }
  })
  cloudinary.uploader.upload(file, 
  function(error, result) {console.log(result, error); });
  }
}

function sendImageToCloudiary(file){

}
  // cloudinary.v2.uploader.upload("/home/sample.jpg", 
  // function(error, result) {console.log(result, error); });

exports.getAllImage = async function (req,res,next){
  var gfs = Grid("mongodb+srv://sonp:Chikiet1@@clusterblogaccessories.w6uag.gcp.mongodb.net/<BlogAccessories>?retryWrites=true&w=majority", mongo);
  gfs.collection("photos.files").findOne({ _id: "5f7f32e4cacd5c3a048c2a32", root: 'resume' }, function (err, file) {
      if (err) {
          return res.status(400).send(err);
      }
      else if (!file) {
          return res.status(404).send('Error on the database looking for the file.');
      }
  
      res.set('Content-Type', file.contentType);
      res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');
  
      var readstream = gfs.createReadStream({
        _id: "5f7f32e4cacd5c3a048c2a32",
        root: 'resume'
      });
  
      readstream.on("error", function(err) { 
          res.end();
      });
      readstream.pipe(res);
    });
  
}