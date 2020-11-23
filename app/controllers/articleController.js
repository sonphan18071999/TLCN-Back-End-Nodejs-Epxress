const { json } = require('body-parser');
const db = require('../models/mainModels');
const upload = require("../middleware/upload");
const { Schema, mongo, isValidObjectId, Mongoose } = require('mongoose');
const {ObjectId} = require('mongodb'); // or ObjectID 
const hash_tag_Controller = require('./hashtagController')

const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name:"dsnt8hyn6",
  api_key:"121517243286974",
  api_secret:"q-rZlX2PIYFPuLOmPlrZso1UYx4"
})

/**Code tao bai article moi trong he thong */
exports.addNewArticle = async function (req, res, next) {
  var article = new db.articleModels();
  article = req.body;
  // 1. Convert link image main Image send to cloudiary make it online
  if(article.AvatarPost!=null){
      await cloudinary.uploader.upload(article.AvatarPost, function (err, result) {
        //set URL for Avatar Post
        article.AvatarPost=err.url;
    })
  }
   //2. Convert link images send to cloudiary and make it online
  for (var i = 0; i < article.content.length; i++) {
    if (article.content[i].images!=null) {
      await cloudinary.uploader.upload(article.content[i].images,
        function (err, result) {
          //Lấy URL trả về từ Cloudiary
          article.content[i].images = err.url.toString();
        })
    }
  }
  // 3. Insert article to database type JSON - Raw
  var abc = await db.articleModels.create(article);
  if (abc) {
  //4. Thêm hashTag vào table.
  var hashTag = {
    idArticle:abc._id,
    hashTag:req.body.hashTag
  }
  hash_tag_Controller.createHashTag(hashTag,res,next);
  return res.status(200).json({
      "Message":"Post article successfully",
      "article":abc
    })
  }
  
}


 /**Lấy 1 bài viết có lượt like cao nhất trong ngày. 
   * Và 12 bài viết theo ngày.
   * Nếu bài viết trong ngày không đủ sẽ lấy bài viết của các ngày sau đó. */
exports.getAllArticle = async function (req, res, next) {
  const allArticle = await db.articleModels.find();
  /**Đếm số like cao nhất trong ngày */
  // console.log(getDateTime());
  //Format ngày và giờ 30T08:35:55. Trước T là ngày, sau là giờ hiện tại.
  //Step 01: Lấy bài viết có số like cao nhất.
  return  res.status(200).json({
    message: "The most liked article of the day.",
    "PopularArticle":getMostLikeArticleByDay(allArticle),
    "Article":pagingArticle(allArticle,req.body.order)
  }); 
}
function pagingArticle (allArticle,current) {
  var article = new Array(); 
  var sixArticle = new Array(); 
  var currentDay = new Date();
  /**Chọn ra danh sách những bài viết ngày hôm nay*/
  allArticle.forEach(element => {
    if(element.postedOn.getDate()==currentDay.getDate()){
      article.push(element);
    }
  });
  /**Chọn ra danh sách những bài viết ngày hôm nay*/
  /**Load mỗi lần 6 bài viết  */
  for(var i = current*6;i<article.length && i<current*6+6;i++){
    sixArticle.push(article[i]);
    }
  /**Load mỗi lần 6 bài viết  */
  return sixArticle;
}
 function getMostLikeArticleByDay(allArticle){
    var arrArticle =new Array(),maxLikeCounts=0;    //arrArticle: Là mảng lưu tất cả những bài có like cao giống nhau.
    var mostLikedArticle = new db.articleModels();
    var minHour=24, minDay=31,minMinutes=60;
    //Lấy số like cao nhất.
    maxLikeCounts=maxInArray(allArticle);
    //Kiểm tra có trên 2 bài viết trung số like ko? 
    allArticle.forEach(element=>{
      if(maxLikeCounts==element.likesCount){
        arrArticle.push(element);
      }
    })
    //Nếu có, ưu tiên bài viết được up trước
    if(arrArticle.length>=1){
      for(var i = 0;i<arrArticle.length;i++){
        if(arrArticle[i].postedOn.getDate()<=minDay
        && arrArticle[i].postedOn.getHours()<=minHour
        && arrArticle[i].postedOn.getMinutes()<=minMinutes){
          minDay=arrArticle[i].postedOn.getDate();
          minHour=arrArticle[i].postedOn.getHours();
          minMinutes = arrArticle[i].postedOn.getMinutes();
          mostLikedArticle=arrArticle[i];
        }
      }
    }else{
      mostLikedArticle = arrArticle[0];
    }
    return mostLikedArticle;
  }
function maxInArray (allArticle) {  
  var currentDatetime = new Date(),maxLikeCounts=0;
  allArticle.forEach(element => {
    if (element.postedOn.getDate() == currentDatetime.getDate()) {
      if (maxLikeCounts < element.likesCount) {
        maxLikeCounts = element.likesCount;
      }
    }
  });
  return maxLikeCounts;
}
function getDateTime() {
  var date = new Date();
  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;
  var min = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;
  var sec = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;
  // var year = date.getFullYear();
  // var month = date.getMonth() + 1;
  // month = (month < 10 ? "0" : "") + month;
  var day = date.getDate();
  day = (day < 10 ? "0" : "") + day;
  return day + "T" + hour + ":" + min + ":" + sec;
}
exports.getArticleById = async function (req, res, next) {
  // await db.articleModels.findOne({ _id: req.query.id },(err,ok)=>{
  // return ok ? res.status(200).json({"Aricle":ok}) : 
  //             res.status(500).json({"Cant retrive article ":err})
  // })
  var article = await db.articleModels.findOne({ _id: req.query.id });
  var info = await db.userAccountModels.findOne({ _id: article.idUser });
  var hashTag = await hash_tag_Controller.getAllHashTagByArticleId(article._id,res,next);
  var relatedArticle = await getArticleWithByHashTag(hashTag,res,next);
  if (article != null && info != null ) {
    return res.status(200).json(
      {
        "Aricle": article,
        "Author": info,
        "hashTag":hashTag,
        "RelatedArticle":relatedArticle
      })
  } else {
    return res.status(500).json({ "Message": "Empty" })
  }
}

getArticleWithByHashTag = async function (req,res,next){
  var arrayIdArticle = new Array();
  var newArrayIdArticle = new Array();
  var allRelatedArticle = new Array();
  //1. Đưa tất cả những id article có những hashtag trung nhau vào một array
  for(var item of req){
    for (var idArticle of item.article){
      arrayIdArticle.push(idArticle);
    }
  }
  // console.log(arrayIdArticle.length)
  //2. Loại bỏ những id article trung nhau.
  let uniq = {};
  newArrayIdArticle = arrayIdArticle.filter(obj => !uniq[obj] && (uniq[obj] = true))
  //3.Từ mảng article mới đó trả về những nội dung trong article.
  for(var item of newArrayIdArticle){
    let a = await db.articleModels.findOne({_id:item})
    allRelatedArticle.push(a);
  }
  return allRelatedArticle;
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

exports.likeArticle = async(req,res,next)=>{
}
exports.getAllArticleByIdUser = async(req,res,next)=>{
  var article = await db.articleModels.find({idUser:req.query.id});
  return res.status(200).json({
    "Message" : "All article",
    "article" : article
  })  
}

