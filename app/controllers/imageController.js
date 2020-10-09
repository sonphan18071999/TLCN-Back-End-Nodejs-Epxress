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
  // try {
  //   // thực hiện upload
  //   await uploadLocal(req, res);
  //   // Nếu upload thành công, không lỗi thì tất cả các file của bạn sẽ được lưu trong biến req.files
  //   console.log(req.files);
  //   // Mình kiểm tra thêm một bước nữa, nếu như không có file nào được gửi lên thì trả về thông báo cho client
  //   if (req.files.length <= 0) {
  //     return res.send(`You must select at least 1 file or more.`);
  //   }
  //   // trả về cho người dùng cái thông báo đơn giản.
  //   res.send(`Your files has been uploaded.`);
  //   } catch (error) {
  //   // Nếu có lỗi thì console.log lỗi xem là gì ở đây
  //   console.log(error);
  //   // Bắt luôn lỗi vượt quá số lượng file cho phép tải lên trong 1 lần
  //   if (error.code === "LIMIT_UNEXPECTED_FILE") {
  //     return res.send(`Exceeds the number of files allowed to upload.`);
  //   }
  //   return res.send(`Error when trying upload many files: ${error}}`);
  // }
  // https://api.cloudinary.com/v1_1/dsnt8hyn6/image/upload

  const file = req.files.photo
  console.log(file);
  cloudinary.uploader.upload(file.tempFilePath,function(err,result){
    console.log("Error: ",err);
    console.log("Result: ",result);
  } )


  // cloudinary.v2.uploader.upload("/home/sample.jpg", 
  // function(error, result) {console.log(result, error); });

}
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